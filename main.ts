//% color="#00CC00" icon="\uf1f9"
//% block="XGO Lite"
//% block.loc.nl="XGO Lite"
namespace CXgoLite {

    xgo.init_xgo_serial(SerialPin.P14, SerialPin.P13)

    //////////////
    // MESSAGES //
    //////////////

    // The XGo is programmed by means of messages.
    // The available messages are enumerated in 'Message'
    // and are executed by the routine 'handleMessage'.

    enum Message {

        Stop,           // stops the walking
        Wait,           // suspend the program for the specified time
        Pause,          // pause the program until Message.Continue
        Continue,       // continue the program after Message.Pause

        FastWave,       // execute next message in a wave
        NormalWave,
        SlowWave,

        Action,         // perform a standard action

        Forward,        // move in the specified direction
        Backward,
        Left,
        Right,

        SetSpeed,       // set the speed between 0 and 100 %
        SpeedUp,        // speeding up by 10 %
        SlowDown,       // slowing down by 10 %

        TurnLeft,       // turn as a continuous rotation
        TurnRight,      // the rotation will be stopped by
        TurnOff,        // a movement message or the stop message

        ArmHigh,        // X:40, Z:90
        ArmFront,       // X:70, Z:80
        ArmLow,         // X:90, Z:50
        ArmFloor,       // X:80, Z:10

        ClampOpen,      // open the clamp to position CLAMPOPEN
        ClampClose,     // close the clamp to position CLAMPCLOSED

        Stand,          // perform an XGo standard action
        Prone,
        Sit,
        Swing,
        Greet,
        Roll,
        Whirl,
        Crawl,
        Stretch,
        Squat,
        Pee
    }

    let MESSAGE: number = -1
    let PAUSE: boolean = false

    //////////////////////////////
    // SEVERAL XGO'S IN A GROUP //
    //////////////////////////////

    // In a group a rider should call:
    // - setGroup, specifying the group it is committed to.
    // - setPosition, specifying the position within the group.
    // The position in the group determines the waiting time
    // when an instruction must be performed in 'wave'-mode.

    export enum Position {
        //% block="position 1"
        //% block.loc.nl="positie 1"
        Position1,
        //% block="position 2"
        //% block.loc.nl="positie 2"
        Position2,
        //% block="position 3"
        //% block.loc.nl="positie 3"
        Position3,
        //% block="position 4"
        //% block.loc.nl="positie 4"
        Position4,
        //% block="position 5"
        //% block.loc.nl="positie 5"
        Position5,
        //% block="position 6"
        //% block.loc.nl="positie 6"
        Position6,
        //% block="position 7"
        //% block.loc.nl="positie 7"
        Position7,
        //% block="position 8"
        //% block.loc.nl="positie 8"
        Position8,
        //% block="position 9"
        //% block.loc.nl="positie 9"
        Position9
    }

    export enum Wave {
        //% block="slow"
        //% block.loc.nl="langzame"
        Slow,
        //% block="normal"
        //% block.loc.nl="gewone"
        Normal,
        //% block="fast"
        //% block.loc.nl="snelle"
        Fast
    }

    let POSITION: number = 0 // leader
    let WAVE: number = 0

    /////////////////////////
    // CONTROLLING THE XGO //
    /////////////////////////

    export enum Movement {
        //% block="forward""
        //% block.loc.nl="vooruit"
        Forward,
        //% block="backward"
        //% block.loc.nl="achteruit"
        Backward,
        //% block="to the left"
        //% block.loc.nl="naar links"
        Left,
        //% block="to the right"
        //% block.loc.nl="naar rechts"
        Right
    }

    export enum Rotation {
        //% block="to the left"
        //% block.loc.nl="naar links"
        TurnLeft,
        //% block="to the right"
        //% block.loc.nl="naar rechts"
        TurnRight,
        //% block="30 deg to the left"
        //% block.loc.nl="30 gr naar links"
        RotateLeft,
        //% block="30 deg to the right"
        //% block.loc.nl="30 gr naar rechts"
        RotateRight
    }

    export enum ArmPosition {
        //% block="high up""
        //% block.loc.nl="ver omhoog"
        High, // X:40,Z90
        //% block="straight to the front"
        //% block.loc.nl="recht naar voren"
        Front, // X:70,Z:80
        //% block="low to the front"
        //% block.loc.nl="laag naar voren"
        Low, // X:90,Z:50
        //% block="to the floor"
        //% block.loc.nl="naar de vloer"
        Floor // X:80,Z:10
    }

    export enum ClampState {
        //% block="close"
        //% block.loc.nl="sluit"
        Close,
        //% block="open"
        //% block.loc.nl="open"
        Open
    }

    let MOVEMENT: number = Message.Stop // the latest movement message

    // Speed range:
    // ------------
    // Value: 0 to 100 (in %)
    // Message: 1000 to 1100
    let SPEED: number = 50

    // Clamp range
    // -----------
    // Minimum value: 0 (equal to 53.0 mm)
    // Maximum value: 255 (equal to 22.5 mm)
    let CLAMPCLOSED: number = 255
    let CLAMPOPEN: number = 0

    export enum Action {
        //% block="stand up"
        //% block.loc.nl="staan"
        Stand,
        //% block="lay down"
        //% block.loc.nl="liggen"
        Prone,
        //% block="swing"
        //% block.loc.nl="swingen"
        Swing,
        //% block="greet"
        //% block.loc.nl="groeten"
        Greet,
        //% block="roll"
        //% block.loc.nl="schudden"
        Roll,
        //% block="whirl"
        //% block.loc.nl="wervelen"
        Whirl,
        //% block="crawl"
        //% block.loc.nl="besluipen"
        Crawl,
        //% block="stretch"
        //% block.loc.nl="uitrekken"
        Stretch,
        //% block="squat"
        //% block.loc.nl="hurken"
        Squat,
        //% block="pee"
        //% block.loc.nl="plassen"
        Pee
    }

    ///////////////////////////////
    // MESSAGE HANDLING ROUTINES //
    ///////////////////////////////

    function stopMoving() {
        xgo.move_xgo(xgo.direction_enum.Forward, 0)
        xgo.move_xgo(xgo.direction_enum.Left, 0)
        xgo.rotate(xgo.rotate_enum.Left, 0)
    }

    function handleMessage() {

        // A leader sends its movements to the followers
        if (!POSITION)
            radio.sendNumber(MESSAGE)

        // Instead of 'Message.Wait', this message is submitted by
        // the calculated value of '10000 + wait time'.
        let wait = 0
        if (MESSAGE >= 10000) {
            wait = MESSAGE - 10000
            MESSAGE = Message.Wait
        }

        // Instead of 'Message.Speed', this message is submitted by
        // the calculated value of '1000 + required speed'.
        if (MESSAGE >= 1000) {
            SPEED = MESSAGE - 1000
            // reactivate the latest movement message
            MESSAGE = MOVEMENT
        }

        // The messages 'Message.FastWave', 'Message.NormalWave'
        // and 'Message.SlowWave' only set the WAVE variable
        // depending on the follower's position.
        // Afterwards, WAVE is used to pause before the
        // execution of the next message to create the wave effect.
        // Message.Stop however is excluded from the wave behaviour.
        if (WAVE > 0 && MESSAGE != Message.Stop) {
            basic.pause(WAVE * 1000)
            WAVE = 0
        }

        switch (MESSAGE) {
            case Message.Stop:
                stopMoving()
                break
            case Message.Wait:
                basic.pause(wait * 1000)
                break
            case Message.FastWave:
                WAVE = (POSITION - 1) * 0.3
                break
            case Message.NormalWave:
                WAVE = (POSITION - 1) * 0.5
                break
            case Message.SlowWave:
                WAVE = (POSITION - 1) * 1.0
                break
            //
            // XGO MOVEMENT CONTROL
            //
            case Message.Forward:
                MOVEMENT = Message.Forward
                xgo.move_xgo(xgo.direction_enum.Left, 0)
                xgo.rotate(xgo.rotate_enum.Left, 0)
                xgo.move_xgo(xgo.direction_enum.Forward, SPEED)
                break
            case Message.Backward:
                MOVEMENT = Message.Backward
                xgo.move_xgo(xgo.direction_enum.Left, 0)
                xgo.rotate(xgo.rotate_enum.Left, 0)
                xgo.move_xgo(xgo.direction_enum.Backward, SPEED)
                break
            case Message.Left:
                MOVEMENT = Message.Left
                // left and right seem to have switched
                xgo.move_xgo(xgo.direction_enum.Right, SPEED)
                break
            case Message.Right:
                MOVEMENT = Message.Right
                // left and right seem to have switched
                xgo.move_xgo(xgo.direction_enum.Left, SPEED)
                break
            case Message.TurnLeft:
                MOVEMENT = Message.TurnLeft
                xgo.move_xgo(xgo.direction_enum.Left, 0)
                xgo.rotate(xgo.rotate_enum.Left, 100)
                break
            case Message.TurnRight:
                MOVEMENT = Message.TurnRight
                xgo.move_xgo(xgo.direction_enum.Left, 0)
                xgo.rotate(xgo.rotate_enum.Right, 100)
                break
            case Message.TurnOff:
                MOVEMENT = Message.TurnOff
                xgo.rotate(xgo.rotate_enum.Left, 0)
                break
            case Message.SpeedUp:
                SPEED += 10
                if (SPEED > 100) SPEED = 100
                // call handleMessage recursively to activate the speed
                MESSAGE = MOVEMENT
                handleMessage()
                break
            case Message.SlowDown:
                SPEED -= 10
                if (SPEED < 0) SPEED = 0
                // call handleMessage recursively to activate the speed
                MESSAGE = MOVEMENT
                handleMessage()
                break
            //
            // XGO ARM CONTROL
            //
            case Message.ArmHigh:
                xgo.Manipulator_clampX(40)
                xgo.Manipulator_clampZ(90)
                break
            case Message.ArmFront:
                xgo.Manipulator_clampX(70)
                xgo.Manipulator_clampZ(80)
                break
            case Message.ArmLow:
                xgo.Manipulator_clampX(90)
                xgo.Manipulator_clampZ(50)
                break
            case Message.ArmFloor:
                xgo.Manipulator_clampX(80)
                xgo.Manipulator_clampZ(10)
                break
            case Message.ClampClose:
                xgo.Manipulator_clamp(CLAMPCLOSED)
                break
            case Message.ClampOpen:
                xgo.Manipulator_clamp(CLAMPOPEN)
                break
            //
            // XGO STANDARD ACTIONS
            //
            case Message.Stand: xgo.execution_action(xgo.action_enum.Default_posture); break;
            case Message.Prone: xgo.body_height(0); xgo.servo_switch(xgo.servo_switch_enum.Unload); break;
            case Message.Sit: xgo.execution_action(xgo.action_enum.Sit_down); break;
            case Message.Pee: xgo.execution_action(xgo.action_enum.Pee); break;
            case Message.Swing: xgo.execution_action(xgo.action_enum.Play_pendulum); break;
            case Message.Greet: xgo.execution_action(xgo.action_enum.Wave); break;
            case Message.Roll: xgo.execution_action(xgo.action_enum.Twirl_Roll); break;
            case Message.Whirl: xgo.execution_action(xgo.action_enum.Whirl); break;
            case Message.Crawl: xgo.execution_action(xgo.action_enum.Crawl_forward); break;
            case Message.Stretch: xgo.execution_action(xgo.action_enum.Stretch_oneself); break;
            case Message.Squat: xgo.execution_action(xgo.action_enum.Squat); break;
        }
        MESSAGE = -1
    }

    function showPosition(): void {
        basic.showString("P" + POSITION.toString())
    }

    input.onLogoEvent(TouchButtonEvent.Pressed, function () {
        showPosition()
    })

    ////////////////////////
    // PROGRAMMING BLOCKS //
    ////////////////////////

    //% block="position"
    //% block.loc.nl="positie"
    export function position(): number {
        return POSITION
    }

    //% block="follow at %pos"
    //% block.loc.nl="volg op %pos"
    export function setPosition(pos: Position) {
        POSITION = pos + 1
    }

    //% block="do a %wave wave"
    //% block.loc.nl="maak een %wave wave"
    export function setWave(wave: Wave) {
        switch (wave) {
            case Wave.Slow: MESSAGE = Message.SlowWave; break;
            case Wave.Normal: MESSAGE = Message.NormalWave; break;
            case Wave.Fast: MESSAGE = Message.FastWave; break;
        }
        if (!PAUSE) handleMessage()
    }

    //% block="perform the %action"
    //% block.loc.nl="ga %action"
    export function performAction(action: Action) {
        switch (action) {
            case Action.Stand: MESSAGE = Message.Stand; break;
            case Action.Prone: MESSAGE = Message.Prone; break;
            case Action.Swing: MESSAGE = Message.Swing; break;
            case Action.Greet: MESSAGE = Message.Greet; break;
            case Action.Roll: MESSAGE = Message.Roll; break;
            case Action.Whirl: MESSAGE = Message.Whirl; break;
            case Action.Crawl: MESSAGE = Message.Crawl; break;
            case Action.Stretch: MESSAGE = Message.Stretch; break;
            case Action.Squat: MESSAGE = Message.Squat; break;
            case Action.Pee: MESSAGE = Message.Pee; break;
        }
        if (!PAUSE) handleMessage()
    }

    //% block="clamp size: closes to %closed mm and opens to %open mm width"
    //% block.loc.nl="grijper afmeting: sluit tot %closed mm en opent tot %open mm breedte"
    //% closed.min=25 closed.max=50.0 closed.defl=25
    //% open.min=25 open.max=50.0 open.defl=50
    // The motor takes a value range of 255 (closed) to 0 (open).
    // The input in mm should be multiplied by (255-0)/(50-25) therefore.
    export function setClampRange(closed: number, open: number) {
        closed = (closed - 25) * 10.2
        open = (open - 25) * 10.2
        if (open > closed) {
            // input was inverted
            let n = closed
            closed = open
            open = n
        }
        CLAMPOPEN = open
        CLAMPCLOSED = closed
    }

    //% block="%state the clamp"
    //% block.loc.nl="%state de grijper"
    export function clamp(state: ClampState) {
        switch (state) {
            case ClampState.Open: MESSAGE = Message.ClampOpen; break;
            case ClampState.Close: MESSAGE = Message.ClampClose; break;
        }
        if (!PAUSE) handleMessage()
    }

    //% block="move the arm %move"
    //% block.loc.nl="beweeg de arm %move"
    export function moveArm(position: ArmPosition) {
        switch (position) {
            case ArmPosition.High: MESSAGE = Message.ArmHigh; break;
            case ArmPosition.Front: MESSAGE = Message.ArmFront; break;
            case ArmPosition.Low: MESSAGE = Message.ArmLow; break;
            case ArmPosition.Floor: MESSAGE = Message.ArmFloor; break;
        }
        if (!PAUSE) handleMessage()
    }

    //% block="turn %rotation"
    //% block.loc.nl="draai %rotation"
    export function turn(rotation: Rotation) {
        switch (rotation) {
            case Rotation.TurnLeft: MESSAGE = Message.TurnLeft; break;
            case Rotation.TurnRight: MESSAGE = Message.TurnRight; break;
        }
        if (!PAUSE) handleMessage()
    }

    //% block="walk %movement"
    //% block.loc.nl="loop %movement"
    export function move(movement: Movement) {
        switch (movement) {
            case Movement.Forward: MESSAGE = Message.Forward; break;
            case Movement.Backward: MESSAGE = Message.Backward; break;
            case Movement.Left: MESSAGE = Message.Left; break;
            case Movement.Right: MESSAGE = Message.Right; break;
        }
        if (!PAUSE) handleMessage()
    }

    //% block="set speed to %speed \\%"
    //% block.loc.nl="stel de snelheid in op %speed \\%"
    //% speed.min=0 speed.max=100 speed.defl=50
    export function setSpeed(speed: number) {
        MESSAGE = 1000 + speed;
        if (!PAUSE) handleMessage()
    }

    //% block="stop"
    //% block.loc.nl="stop"
    export function stop() {
        MESSAGE = Message.Stop
        if (!PAUSE) handleMessage()
    }

    //% block="a number from %min upto %max"
    //% block.loc.nl="een getal van %min t/m %max"
    //% max.defl=10
    export function randomInt(min: number, max: number): number {
        let i = 0
        if (min > max) {
            i = min
            min = max
            max = i
        }
        i = max - min + 1
        i = min + Math.floor(Math.random() * i)
        return i
    }

    //% block="wait %time sec"
    //% block.loc.nl="wacht %time sec"
    //% min.defl=1
    export function wait(time: number) {
        MESSAGE = 10000 + time
        if (!PAUSE) handleMessage()
    }

    //% color="#008800"
    //% block="comment: %dummy"
    //% block.loc.nl="uitleg: %dummy"
    //% min.defl="schrijf hier je uitleg"
    export function comment(dummy: string) {
    }

}
