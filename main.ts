namespace xgo {

    /*
    The xgo code is copied from the ElecFreaks 'pxt-xgo' library:
    https://github.com/elecfreaks/pxt-xgo/blob/master/main.ts
    (MIT-license)
    */

    export enum rotate_enum {
        Left,
        Right
    }

    export enum direction_enum {
        Forward,
        Backward,
        Left,
        Right
    }

    export enum speed_frequency_enum {
        servo_speed,
        stepped_frequency
    }

    export enum speed_enum {
        fast = 0xf0,
        normal = 0x80,
        slow = 0x10
    }

    export enum translation_direction_enum {
        Forward,
        Backward,
        left_shift,
        right_shift
    }

    export enum rotate_direction_enum {
        turn_left,
        turn_right
    }

    export enum orientation_enum {
        X,
        Y,
        Z
    }

    export enum body_direction_xyz_enum {
        X,
        Y,
        Z
    }

    export enum translation_xyz_enum {
        X,
        Y,
        Z
    }

    export enum switch_enum {
        Turn_on,
        Turn_off
    }

    export enum servo_switch_enum {
        Load,
        Unload
    }

    export enum body_parts_enum {
        left_front,
        left_hind,
        right_front,
        right_hind
    }

    export enum joint_enum {
        upper,
        middle,
        below
    }

    export enum turn_joint_enum {
        upper,
        middle,
        below
    }
    export enum clmap_stable_enum {
        Stable,
        Unstable
    }

    export enum action_enum {
        Default_posture,
        Go_prone,
        Stand,
        Crawl_forward,
        Whirl,
        Sur_place,
        Squat,
        Twirl_Roll,
        Twirl_Pitch,
        Twirl_Yaw,
        Triaxial_rotation,
        Pee,
        Sit_down,
        Wave,
        Stretch_oneself,
        Play_pendulum,
        Request_feeding,
        Looking_for_food,
        Handshake
    }

    export enum pose_enum {
        //% block="pose1"
        pose1,
        //% block="pose2"
        pose2,
        //% block="pose3"
        pose3,
        //% block="pose4"
        pose4,
        //% block="pose5"
        pose5
    }

    let pose1zx = pins.createBuffer(23)
    let pose2zx = pins.createBuffer(23)
    let pose3zx = pins.createBuffer(23)
    let pose4zx = pins.createBuffer(23)
    let pose5zx = pins.createBuffer(23)

    export function init_xgo_serial(tx: SerialPin, rx: SerialPin) {
        serial.redirect(tx, rx, BaudRate.BaudRate115200)
        xgo.init_action()
    }

    export function execution_action(action: action_enum) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x3E
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        switch (action) {
            case action_enum.Default_posture:
                commands_buffer[5] = 0xFF
                commands_buffer[6] = 0xB9
                serial.writeBuffer(commands_buffer)
                basic.pause(1000)
                break
            case action_enum.Go_prone:
                commands_buffer[5] = 0x01
                commands_buffer[6] = 0xB7
                serial.writeBuffer(commands_buffer)
                basic.pause(3000)
                break
            case action_enum.Stand:
                commands_buffer[5] = 0x02
                commands_buffer[6] = 0xB6
                serial.writeBuffer(commands_buffer)
                basic.pause(3000)
                break
            case action_enum.Crawl_forward:
                commands_buffer[5] = 0x03
                commands_buffer[6] = 0xB5
                serial.writeBuffer(commands_buffer)
                basic.pause(5000)
                break
            case action_enum.Whirl:
                commands_buffer[5] = 0x04
                commands_buffer[6] = 0xB4
                serial.writeBuffer(commands_buffer)
                basic.pause(5000)
                break
            case action_enum.Sur_place:
                commands_buffer[5] = 0x05
                commands_buffer[6] = 0xB3
                serial.writeBuffer(commands_buffer)
                break
            case action_enum.Squat:
                commands_buffer[5] = 0x06
                commands_buffer[6] = 0xB2
                serial.writeBuffer(commands_buffer)
                basic.pause(4000)
                break
            case action_enum.Twirl_Roll:
                commands_buffer[5] = 0x07
                commands_buffer[6] = 0xB1
                serial.writeBuffer(commands_buffer)
                basic.pause(4000)
                break
            case action_enum.Twirl_Pitch:
                commands_buffer[5] = 0x08
                commands_buffer[6] = 0xB0
                serial.writeBuffer(commands_buffer)
                basic.pause(5000)
                break
            case action_enum.Twirl_Yaw:
                commands_buffer[5] = 0x09
                commands_buffer[6] = 0xAF
                serial.writeBuffer(commands_buffer)
                basic.pause(5000)
                break
            case action_enum.Triaxial_rotation:
                commands_buffer[5] = 0x0A
                commands_buffer[6] = 0xAE
                serial.writeBuffer(commands_buffer)
                basic.pause(7000)
                break
            case action_enum.Pee:
                commands_buffer[5] = 0x0B
                commands_buffer[6] = 0xAD
                serial.writeBuffer(commands_buffer)
                basic.pause(7000)
                break
            case action_enum.Sit_down:
                commands_buffer[5] = 0x0C
                commands_buffer[6] = 0xAC
                serial.writeBuffer(commands_buffer)
                basic.pause(5000)
                break
            case action_enum.Wave:
                commands_buffer[5] = 0x0D
                commands_buffer[6] = 0xAB
                serial.writeBuffer(commands_buffer)
                basic.pause(7000)
                break
            case action_enum.Stretch_oneself:
                commands_buffer[5] = 0x0E
                commands_buffer[6] = 0xAA
                serial.writeBuffer(commands_buffer)
                basic.pause(5000)
                basic.pause(5000)
                break
            case action_enum.Play_pendulum:
                commands_buffer[5] = 0x10
                commands_buffer[6] = 0xA8
                serial.writeBuffer(commands_buffer)
                basic.pause(7000)
                break
            case action_enum.Request_feeding:
                commands_buffer[5] = 0x11
                commands_buffer[6] = 0xA7
                serial.writeBuffer(commands_buffer)
                basic.pause(4000)
                break
            case action_enum.Looking_for_food:
                commands_buffer[5] = 0x12
                commands_buffer[6] = 0xA6
                serial.writeBuffer(commands_buffer)
                basic.pause(5000)
                break
            case action_enum.Handshake:
                commands_buffer[5] = 0x13
                commands_buffer[6] = 0xA5
                serial.writeBuffer(commands_buffer)
                basic.pause(5000)
                basic.pause(5000)
                break
        }
    }

    export function init_action() {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x3E
        commands_buffer[5] = 0xFF
        commands_buffer[6] = ~(0x09 + 0x00 + 0x3E + 0xFF)
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        serial.writeBuffer(commands_buffer)
        basic.pause(1000)
    }

    export function gyroscope_switch(on_off: switch_enum) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x61
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        switch (on_off) {
            case switch_enum.Turn_on:
                commands_buffer[5] = 0x01
                break
            case switch_enum.Turn_off:
                commands_buffer[5] = 0x00
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + 0x61 + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    export function get_electric_quantity(): number {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x02
        commands_buffer[4] = 0x01
        commands_buffer[5] = 0x01
        commands_buffer[6] = ~(0x09 + 0x02 + 0x01 + 0x01)
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        serial.writeBuffer(commands_buffer)
        let read_data_buffer = pins.createBuffer(9)
        read_data_buffer = serial.readBuffer(9)
        return read_data_buffer[5]
    }

    export function get_version(): string {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x02
        commands_buffer[4] = 0x07
        commands_buffer[5] = 0x00
        commands_buffer[6] = 0xED
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        serial.writeBuffer(commands_buffer)
        let read_data_buffer = pins.createBuffer(9)
        read_data_buffer = serial.readBuffer(18)
        let version = String.fromCharCode(read_data_buffer[5]) + String.fromCharCode(read_data_buffer[6]) + String.fromCharCode(read_data_buffer[7]) + String.fromCharCode(read_data_buffer[8]) + String.fromCharCode(read_data_buffer[9])
        return version
    }

    export function servo_setting(part: body_parts_enum, on_off: servo_switch_enum) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x20
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        switch (part) {

            case body_parts_enum.left_front:
                if (on_off == servo_switch_enum.Load)
                    commands_buffer[5] = 0x21
                else
                    commands_buffer[5] = 0x11
                break

            case body_parts_enum.left_hind:
                if (on_off == servo_switch_enum.Load)
                    commands_buffer[5] = 0x24
                else
                    commands_buffer[5] = 0x14
                break

            case body_parts_enum.right_front:
                if (on_off == servo_switch_enum.Load)
                    commands_buffer[5] = 0x22
                else
                    commands_buffer[5] = 0x12
                break

            case body_parts_enum.right_hind:
                if (on_off == servo_switch_enum.Load)
                    commands_buffer[5] = 0x23
                else
                    commands_buffer[5] = 0x13
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + 0x20 + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
        basic.pause(50)
    }

    export function set_speed_frequency(speed_frequency: speed_frequency_enum, speed: speed_enum) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        if (speed_frequency == speed_frequency_enum.servo_speed) {
            commands_buffer[4] = 0x5C
            commands_buffer[5] = speed
        }
        else {
            commands_buffer[4] = 0x3D
            if (speed == speed_enum.fast)
                commands_buffer[5] = 0x02
            else if (speed == speed_enum.normal)
                commands_buffer[5] = 0x00
            else if (speed == speed_enum.slow)
                commands_buffer[5] = 0x01
        }
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    export function body_height(height: number) {
        let height_buffer = pins.createBuffer(9)
        if (height > 100)
            height = 100
        if (height < 0)
            height = 0
        height_buffer[0] = 0x55
        height_buffer[1] = 0x00
        height_buffer[2] = 0x09
        height_buffer[3] = 0x00
        height_buffer[4] = 0x35
        height_buffer[5] = Math.map(height, 0, 100, 0, 255)
        height_buffer[6] = ~(0x09 + 0x00 + 0x35 + height_buffer[5])
        height_buffer[7] = 0x00
        height_buffer[8] = 0xAA
        serial.writeBuffer(height_buffer)
        basic.pause(2000)
    }

    export function SetPosestate(posestate: pose_enum) {
        let commands_buffer = pins.createBuffer(9)
        let reset_buffer = pins.createBuffer(9)
        let part = 0
        let i = 0
        let UsingBuffer = pins.createBuffer(23)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x3E
        commands_buffer[5] = 0xFF
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        serial.writeBuffer(commands_buffer)
        basic.pause(1000)
        switch (posestate) {
            case pose_enum.pose1:
                for (i = 0; i < 23;) {
                    UsingBuffer[i] = pose1zx[i]
                    i = i + 1
                }
                break
            case pose_enum.pose2:
                for (i = 0; i < 23;) {
                    UsingBuffer[i] = pose2zx[i]
                    i = i + 1
                }
                break
            case pose_enum.pose3:
                for (i = 0; i < 23;) {
                    UsingBuffer[i] = pose3zx[i]
                    i = i + 1
                }
                break
            case pose_enum.pose4:
                for (i = 0; i < 23;) {
                    UsingBuffer[i] = pose4zx[i]
                    i = i + 1
                }
                break
            case pose_enum.pose5:
                for (i = 0; i < 23;) {
                    UsingBuffer[i] = pose5zx[i]
                    i = i + 1
                }
                break
            default:
                break
        }

        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x71
        commands_buffer[5] = UsingBuffer[17]
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        serial.writeBuffer(commands_buffer)
        basic.pause(50)

        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x5D
        commands_buffer[5] = UsingBuffer[18]
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        serial.writeBuffer(commands_buffer)
        basic.pause(50)

        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x5E
        commands_buffer[5] = UsingBuffer[19]
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        serial.writeBuffer(commands_buffer)
        basic.pause(50)

        for (part = 0; part < 4; part++) {
            switch (part) {
                case body_parts_enum.left_front:
                    commands_buffer[0] = 0x55
                    commands_buffer[1] = 0x00
                    commands_buffer[2] = 0x09
                    commands_buffer[3] = 0x00
                    commands_buffer[7] = 0x00
                    commands_buffer[8] = 0xAA
                    commands_buffer[4] = 0x52

                    commands_buffer[5] = UsingBuffer[7]
                    commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                    serial.writeBuffer(commands_buffer)
                    basic.pause(50)
                    commands_buffer[0] = 0x55
                    commands_buffer[1] = 0x00
                    commands_buffer[2] = 0x09
                    commands_buffer[3] = 0x00
                    commands_buffer[7] = 0x00
                    commands_buffer[8] = 0xAA
                    commands_buffer[4] = 0x51

                    commands_buffer[5] = UsingBuffer[6]
                    commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                    serial.writeBuffer(commands_buffer)
                    basic.pause(50)
                    commands_buffer[0] = 0x55
                    commands_buffer[1] = 0x00
                    commands_buffer[2] = 0x09
                    commands_buffer[3] = 0x00
                    commands_buffer[7] = 0x00
                    commands_buffer[8] = 0xAA
                    commands_buffer[4] = 0x50

                    commands_buffer[5] = UsingBuffer[5]
                    commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                    serial.writeBuffer(commands_buffer)
                    basic.pause(50)
                    break
                case body_parts_enum.left_hind:
                    commands_buffer[0] = 0x55
                    commands_buffer[1] = 0x00
                    commands_buffer[2] = 0x09
                    commands_buffer[3] = 0x00
                    commands_buffer[7] = 0x00
                    commands_buffer[8] = 0xAA
                    commands_buffer[4] = 0x5B

                    commands_buffer[5] = UsingBuffer[16]
                    commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                    serial.writeBuffer(commands_buffer)
                    basic.pause(50)
                    commands_buffer[0] = 0x55
                    commands_buffer[1] = 0x00
                    commands_buffer[2] = 0x09
                    commands_buffer[3] = 0x00
                    commands_buffer[7] = 0x00
                    commands_buffer[8] = 0xAA
                    commands_buffer[4] = 0x5A

                    commands_buffer[5] = UsingBuffer[15]
                    commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                    serial.writeBuffer(commands_buffer)
                    basic.pause(50)
                    commands_buffer[0] = 0x55
                    commands_buffer[1] = 0x00
                    commands_buffer[2] = 0x09
                    commands_buffer[3] = 0x00
                    commands_buffer[7] = 0x00
                    commands_buffer[8] = 0xAA
                    commands_buffer[4] = 0x59

                    commands_buffer[5] = UsingBuffer[14]
                    commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                    serial.writeBuffer(commands_buffer)
                    basic.pause(50)
                    break
                case body_parts_enum.right_front:
                    commands_buffer[0] = 0x55
                    commands_buffer[1] = 0x00
                    commands_buffer[2] = 0x09
                    commands_buffer[3] = 0x00
                    commands_buffer[7] = 0x00
                    commands_buffer[8] = 0xAA
                    commands_buffer[4] = 0x55

                    commands_buffer[5] = UsingBuffer[10]
                    commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                    serial.writeBuffer(commands_buffer)
                    basic.pause(50)
                    commands_buffer[0] = 0x55
                    commands_buffer[1] = 0x00
                    commands_buffer[2] = 0x09
                    commands_buffer[3] = 0x00
                    commands_buffer[7] = 0x00
                    commands_buffer[8] = 0xAA
                    commands_buffer[4] = 0x54

                    commands_buffer[5] = UsingBuffer[9]
                    commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                    serial.writeBuffer(commands_buffer)
                    basic.pause(50)
                    commands_buffer[0] = 0x55
                    commands_buffer[1] = 0x00
                    commands_buffer[2] = 0x09
                    commands_buffer[3] = 0x00
                    commands_buffer[7] = 0x00
                    commands_buffer[8] = 0xAA
                    commands_buffer[4] = 0x53

                    commands_buffer[5] = UsingBuffer[8]
                    commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                    serial.writeBuffer(commands_buffer)
                    basic.pause(50)
                    break
                case body_parts_enum.right_hind:
                    commands_buffer[0] = 0x55
                    commands_buffer[1] = 0x00
                    commands_buffer[2] = 0x09
                    commands_buffer[3] = 0x00
                    commands_buffer[7] = 0x00
                    commands_buffer[8] = 0xAA
                    commands_buffer[4] = 0x58

                    commands_buffer[5] = UsingBuffer[13]
                    commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                    serial.writeBuffer(commands_buffer)
                    basic.pause(50)
                    commands_buffer[0] = 0x55
                    commands_buffer[1] = 0x00
                    commands_buffer[2] = 0x09
                    commands_buffer[3] = 0x00
                    commands_buffer[7] = 0x00
                    commands_buffer[8] = 0xAA
                    commands_buffer[4] = 0x57

                    commands_buffer[5] = UsingBuffer[12]
                    commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                    serial.writeBuffer(commands_buffer)
                    basic.pause(50)
                    commands_buffer[0] = 0x55
                    commands_buffer[1] = 0x00
                    commands_buffer[2] = 0x09
                    commands_buffer[3] = 0x00
                    commands_buffer[7] = 0x00
                    commands_buffer[8] = 0xAA
                    commands_buffer[4] = 0x56

                    commands_buffer[5] = UsingBuffer[11]
                    commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                    serial.writeBuffer(commands_buffer)
                    basic.pause(50)
                    break
            }
        }

    }

    export function GetPosestate(posestate: pose_enum) {
        let commands_buffer = pins.createBuffer(9)
        let read_data_buffer = pins.createBuffer(23)
        let i = 0
        basic.pause(50)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x02
        commands_buffer[4] = 0x50
        commands_buffer[5] = 0x0C
        commands_buffer[6] = ~(0x09 + 0x02 + 0x50 + commands_buffer[5])
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        serial.writeBuffer(commands_buffer)

        serial.setRxBufferSize(1000)
        read_data_buffer = serial.readBuffer(23)
        switch (posestate) {
            case pose_enum.pose1:
                for (i = 0; i < 23;) {
                    pose1zx[i] = read_data_buffer[i]
                    i = i + 1
                }
                break
            case pose_enum.pose2:
                for (i = 0; i < 23;) {
                    pose2zx[i] = read_data_buffer[i]
                    i = i + 1
                }
                break
            case pose_enum.pose3:
                for (i = 0; i < 23;) {
                    pose3zx[i] = read_data_buffer[i]
                    i = i + 1
                }
                break
            case pose_enum.pose4:
                for (i = 0; i < 23;) {
                    pose4zx[i] = read_data_buffer[i]
                    i = i + 1
                }
                break
            case pose_enum.pose5:
                for (i = 0; i < 23;) {
                    pose5zx[i] = read_data_buffer[i]
                    i = i + 1
                }
                break
            default:
                break
        }

    }

    export function get_servo_angle(part: body_parts_enum, joint: joint_enum) {
        let commands_buffer = pins.createBuffer(9)
        basic.pause(50)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x02
        commands_buffer[4] = 0x50
        commands_buffer[5] = 0x0F
        commands_buffer[6] = ~(0x09 + 0x02 + 0x50 + 0x0F)
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        serial.writeBuffer(commands_buffer)
        let read_data_buffer = pins.createBuffer(23)
        serial.setRxBufferSize(1000)
        read_data_buffer = serial.readBuffer(23)
        switch (part) {
            case body_parts_enum.left_front:
                if (joint == joint_enum.below)
                    return read_data_buffer[5]
                else if (joint == joint_enum.middle)
                    return read_data_buffer[6]
                else
                    return read_data_buffer[7]
                break
            case body_parts_enum.left_hind:
                if (joint == joint_enum.below)
                    return read_data_buffer[8]
                else if (joint == joint_enum.middle)
                    return read_data_buffer[9]
                else
                    return read_data_buffer[10]
                break
            case body_parts_enum.right_front:
                if (joint == joint_enum.below)
                    return read_data_buffer[11]
                else if (joint == joint_enum.middle)
                    return read_data_buffer[12]
                else
                    return read_data_buffer[13]
                break
            case body_parts_enum.right_hind:
                if (joint == joint_enum.below)
                    return read_data_buffer[14]
                else if (joint == joint_enum.middle)
                    return read_data_buffer[15]
                else
                    return read_data_buffer[16]
                break
        }
    }

    export function servo_switch(on_off: servo_switch_enum) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x20
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        switch (on_off) {
            case servo_switch_enum.Load:
                commands_buffer[5] = 0x00
                break
            case servo_switch_enum.Unload:
                commands_buffer[5] = 0x01
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + 0x20 + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
        basic.pause(50)
    }

    export function rotate_angle_reel_reciprocate(direction_xyz: body_direction_xyz_enum, period: number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        if (period > 8)
            period = 8
        if (period < 3)
            period = 3
        switch (direction_xyz) {
            case body_direction_xyz_enum.X:
                commands_buffer[4] = 0x39
                break
            case body_direction_xyz_enum.Y:
                commands_buffer[4] = 0x3A
                break
            case body_direction_xyz_enum.Z:
                commands_buffer[4] = 0x3B
                break
        }
        commands_buffer[5] = Math.map(period, 2, 8, 0, 255)
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    export function rotate_angle_reel_reciprocate_stop(direction_xyz: body_direction_xyz_enum) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        switch (direction_xyz) {
            case body_direction_xyz_enum.X:
                commands_buffer[4] = 0x39
                break
            case body_direction_xyz_enum.Y:
                commands_buffer[4] = 0x3A
                break
            case body_direction_xyz_enum.Z:
                commands_buffer[4] = 0x3B
                break
        }
        commands_buffer[5] = 0
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + 0x00)
        serial.writeBuffer(commands_buffer)
    }

    export function rotate_angle_reel(direction_xyz: body_direction_xyz_enum, angle: number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        if (angle > 20)
            angle = 20
        if (angle < -20)
            angle = -20
        switch (direction_xyz) {
            case body_direction_xyz_enum.X:
                commands_buffer[4] = 0x36
                commands_buffer[5] = Math.map(angle, -20, 20, 0, 255)
                break
            case body_direction_xyz_enum.Y:
                commands_buffer[4] = 0x37
                commands_buffer[5] = Math.map(angle, -20, 20, 0, 255)
                break
            case body_direction_xyz_enum.Z:
                commands_buffer[4] = 0x38
                commands_buffer[5] = Math.map(angle, -20, 20, 0, 255)
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
        basic.pause(2000)
    }

    export function translational_motion_reciprocate_stop(direction_xyz: body_direction_xyz_enum) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        switch (direction_xyz) {
            case body_direction_xyz_enum.X:
                commands_buffer[4] = 0x80
                break
            case body_direction_xyz_enum.Y:
                commands_buffer[4] = 0x81
                break
            case body_direction_xyz_enum.Z:
                commands_buffer[4] = 0x82
                break
        }
        commands_buffer[5] = 0
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + 0x00)
        serial.writeBuffer(commands_buffer)
    }

    export function translational_motion_reciprocate(direction_xyz: body_direction_xyz_enum, period: number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        if (period > 8)
            period = 8
        if (period < 2)
            period = 2
        switch (direction_xyz) {
            case body_direction_xyz_enum.X:
                commands_buffer[4] = 0x80
                break
            case body_direction_xyz_enum.Y:
                commands_buffer[4] = 0x81
                break
            case body_direction_xyz_enum.Z:
                commands_buffer[4] = 0x82
                break
        }
        commands_buffer[5] = Math.map(period, 1, 8, 0, 255)
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    export function translational_motion(direction_xyz: translation_xyz_enum, distance: number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        switch (direction_xyz) {
            case translation_xyz_enum.X:
                commands_buffer[4] = 0x33
                if (distance > 35)
                    distance = 35
                if (distance < -35)
                    distance = -35
                commands_buffer[5] = Math.map(distance, -35, 35, 0, 255)
                break
            case translation_xyz_enum.Y:
                commands_buffer[4] = 0x34
                if (distance > 18)
                    distance = 18
                if (distance < -18)
                    distance = -18
                commands_buffer[5] = Math.map(distance, -18, 18, 0, 255)
                break
            case translation_xyz_enum.Z:
                commands_buffer[4] = 0x35
                if (distance > 115)
                    distance = 115
                if (distance < 75)
                    distance = 75
                commands_buffer[5] = Math.map(distance, 75, 115, 0, 255)
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
        basic.pause(2000)
    }

    export function leg_lift_continue(mm: number, time: number) {
        let commands_buffer = pins.createBuffer(9)
        if (mm > 35)
            mm = 35
        if (mm < 11)
            mm = 11
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x3C
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        commands_buffer[5] = Math.map(mm, 8, 35, 0, 255)
        commands_buffer[6] = ~(0x09 + 0x00 + 0x3C + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
        basic.pause(time * 1000)
        commands_buffer[5] = 0
        commands_buffer[6] = ~(0x09 + 0x00 + 0x3C + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    export function leg_lift(mm: number) {
        let commands_buffer = pins.createBuffer(9)
        if (mm > 35)
            mm = 35
        if (mm < 11)
            mm = 11
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x3C
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        commands_buffer[5] = Math.map(mm, 8, 35, 0, 255)
        commands_buffer[6] = ~(0x09 + 0x00 + 0x3C + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    export function rotate_angle_continue(direction: rotate_direction_enum, speed: number, time: number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x32
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        if (speed > 150)
            speed = 150
        if (speed < 0)
            speed = 0
        switch (direction) {
            case rotate_direction_enum.turn_left:
                commands_buffer[5] = Math.map(speed, 0, 150, 128, 255)
                break
            case rotate_direction_enum.turn_right:
                commands_buffer[5] = Math.map(speed, 0, 150, 128, 0)
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + 0x32 + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
        basic.pause(time * 1000)
        commands_buffer[5] = 0x80
        commands_buffer[6] = ~(0x09 + 0x00 + 0x32 + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    export function rotate_angle(direction: rotate_direction_enum, speed: number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x32
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        if (speed > 150)
            speed = 150
        if (speed < 0)
            speed = 0
        switch (direction) {
            case rotate_direction_enum.turn_left:
                commands_buffer[5] = Math.map(speed, 0, 150, 128, 255)
                break
            case rotate_direction_enum.turn_right:
                commands_buffer[5] = Math.map(speed, 0, 150, 128, 0)
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + 0x32 + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    export function translational_step_continue(direction: translation_direction_enum, step: number, time: number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        if (step > 25)
            step = 25
        if (step < 5)
            step = 5
        switch (direction) {
            case translation_direction_enum.Forward:
                commands_buffer[4] = 0x30
                commands_buffer[5] = Math.map(step, 0, 25, 128, 255)
                break
            case translation_direction_enum.Backward:
                commands_buffer[4] = 0x30
                commands_buffer[5] = Math.map(step, 0, 25, 128, 0)
                break
            case translation_direction_enum.left_shift:
                commands_buffer[4] = 0x31
                commands_buffer[5] = Math.map(step, 0, 25, 128, 0)
                break
            case translation_direction_enum.right_shift:
                commands_buffer[4] = 0x31
                commands_buffer[5] = Math.map(step, 0, 25, 128, 255)
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
        basic.pause(time * 1000)
        commands_buffer[5] = 0x80
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    export function translational_step(direction: translation_direction_enum, step: number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        if (step > 25)
            step = 25
        if (step < 5)
            step = 5
        switch (direction) {
            case translation_direction_enum.Forward:
                commands_buffer[4] = 0x30
                commands_buffer[5] = Math.map(step, 0, 25, 128, 255)
                break
            case translation_direction_enum.Backward:
                commands_buffer[4] = 0x30
                commands_buffer[5] = Math.map(step, 0, 25, 128, 0)
                break
            case translation_direction_enum.left_shift:
                commands_buffer[4] = 0x31
                commands_buffer[5] = Math.map(step, 0, 25, 128, 0)
                break
            case translation_direction_enum.right_shift:
                commands_buffer[4] = 0x31
                commands_buffer[5] = Math.map(step, 0, 25, 128, 255)
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    export function single_leg(part: body_parts_enum, location_x: number, location_y: number, location_z: number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        let X = Math.map(location_x, -35, 35, 0, 255)
        let Y = Math.map(location_y, -18, 18, 0, 255)
        let Z = Math.map(location_z, 75, 115, 0, 255)
        switch (part) {
            case body_parts_enum.left_front:
                commands_buffer[4] = 0x40
                commands_buffer[5] = X
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(50)
                commands_buffer[4] = 0x41
                commands_buffer[5] = Y
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(50)
                commands_buffer[4] = 0x42
                commands_buffer[5] = Z
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(2000)
                break
            case body_parts_enum.right_front:
                commands_buffer[4] = 0x43
                commands_buffer[5] = X
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(50)
                commands_buffer[4] = 0x44
                commands_buffer[5] = Y
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(50)
                commands_buffer[4] = 0x45
                commands_buffer[5] = Z
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(2000)
                break
            case body_parts_enum.right_hind:
                commands_buffer[4] = 0x46
                commands_buffer[5] = X
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(50)
                commands_buffer[4] = 0x47
                commands_buffer[5] = Y
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(50)
                commands_buffer[4] = 0x48
                commands_buffer[5] = Z
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(2000)
                break
            case body_parts_enum.left_hind:
                commands_buffer[4] = 0x49
                commands_buffer[5] = X
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(50)
                commands_buffer[4] = 0x4A
                commands_buffer[5] = Y
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(50)
                commands_buffer[4] = 0x4B
                commands_buffer[5] = Z
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(2000)
                break
        }
    }


    export function set_servo_angle(part: body_parts_enum, joint: turn_joint_enum, angle: number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        switch (part) {
            case body_parts_enum.left_front:
                if (joint == turn_joint_enum.upper) {
                    commands_buffer[4] = 0x52
                }
                else if (joint == turn_joint_enum.middle) {
                    commands_buffer[4] = 0x51
                }
                else {
                    commands_buffer[4] = 0x50
                }
                break
            case body_parts_enum.left_hind:
                if (joint == turn_joint_enum.upper) {
                    commands_buffer[4] = 0x5B
                }
                else if (joint == turn_joint_enum.middle) {
                    commands_buffer[4] = 0x5A
                }
                else {
                    commands_buffer[4] = 0x59
                }
                break
            case body_parts_enum.right_front:
                if (joint == turn_joint_enum.upper) {
                    commands_buffer[4] = 0x55
                }
                else if (joint == turn_joint_enum.middle) {
                    commands_buffer[4] = 0x54
                }
                else {
                    commands_buffer[4] = 0x53
                }
                break
            case body_parts_enum.right_hind:
                if (joint == turn_joint_enum.upper) {
                    commands_buffer[4] = 0x58
                }
                else if (joint == turn_joint_enum.middle) {
                    commands_buffer[4] = 0x57
                }
                else {
                    commands_buffer[4] = 0x56
                }
                break
        }
        switch (joint) {
            case turn_joint_enum.upper:
                commands_buffer[5] = angle
                break
            case turn_joint_enum.middle:
                commands_buffer[5] = angle
                break
            case turn_joint_enum.below:
                commands_buffer[5] = angle
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
        basic.pause(2000)
    }

    export function move_xgo(direction: direction_enum, speed: number) {
        let move_buffer = pins.createBuffer(9)
        move_buffer[0] = 0x55
        move_buffer[1] = 0x00
        move_buffer[2] = 0x09
        move_buffer[3] = 0x00
        move_buffer[7] = 0x00
        move_buffer[8] = 0xAA
        if (speed > 100)
            speed = 100
        if (speed < 0)
            speed = 0
        switch (direction) {
            case direction_enum.Forward:
                move_buffer[4] = 0x30
                move_buffer[5] = Math.map(speed, 0, 100, 128, 255)
                move_buffer[6] = ~(0x09 + 0x00 + 0x30 + move_buffer[5])
                break
            case direction_enum.Backward:
                move_buffer[4] = 0x30
                move_buffer[5] = Math.map(speed, 0, 100, 128, 0)
                move_buffer[6] = ~(0x09 + 0x00 + 0x30 + move_buffer[5])
                break
            case direction_enum.Left:
                move_buffer[4] = 0x31
                move_buffer[5] = Math.map(speed, 0, 100, 128, 0)
                move_buffer[6] = ~(0x09 + 0x00 + 0x31 + move_buffer[5])
                break
            case direction_enum.Right:
                move_buffer[4] = 0x31
                move_buffer[5] = Math.map(speed, 0, 100, 128, 255)
                move_buffer[6] = ~(0x09 + 0x00 + 0x31 + move_buffer[5])
                break
        }
        serial.writeBuffer(move_buffer)
    }

    export function rotate(direction: rotate_enum, speed: number) {
        let rotate_buffer = pins.createBuffer(9)
        rotate_buffer[0] = 0x55
        rotate_buffer[1] = 0x00
        rotate_buffer[2] = 0x09
        rotate_buffer[3] = 0x00
        rotate_buffer[4] = 0x32
        rotate_buffer[7] = 0x00
        rotate_buffer[8] = 0xAA
        if (speed > 100)
            speed = 100
        if (speed < 0)
            speed = 0
        switch (direction) {
            case rotate_enum.Right:
                rotate_buffer[5] = Math.map(speed, 0, 100, 128, 0)
                rotate_buffer[6] = ~(0x09 + 0x00 + 0x32 + rotate_buffer[5])
                break
            case rotate_enum.Left:
                rotate_buffer[5] = Math.map(speed, 0, 100, 128, 255)
                rotate_buffer[6] = ~(0x09 + 0x00 + 0x32 + rotate_buffer[5])
                break
        }
        serial.writeBuffer(rotate_buffer)
    }

    export function Manipulator_clampX(mm: number = 50) {
        let commands_buffer = pins.createBuffer(9)
        if (mm > 100)
            mm = 100
        if (mm < 0)
            mm = 0
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x73
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        commands_buffer[5] = Math.map(mm, 0, 100, 0, 255)
        commands_buffer[6] = ~(0x09 + 0x00 + 0x73 + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
        basic.pause(3000)
    }

    export function Manipulator_clampZ(mm: number) {
        let commands_buffer = pins.createBuffer(9)
        if (mm > 100)
            mm = 100
        if (mm < 0)
            mm = 0
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x74
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        commands_buffer[5] = Math.map(mm, 0, 100, 0, 255)
        commands_buffer[6] = ~(0x09 + 0x00 + 0x74 + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
        basic.pause(3000)
    }

    export function Manipulator_clamp(mm: number) {
        let commands_buffer = pins.createBuffer(9)
        if (mm > 255)
            mm = 255
        if (mm < 0)
            mm = 0
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x71
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        commands_buffer[5] = mm
        commands_buffer[6] = ~(0x09 + 0x00 + 0x71 + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
        basic.pause(3000)
    }

    export function clmap_stable(on_off: clmap_stable_enum) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x72
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        switch (on_off) {
            case clmap_stable_enum.Stable:
                commands_buffer[5] = 0x01
                break
            case clmap_stable_enum.Unstable:
                commands_buffer[5] = 0x00
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + 0x72 + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    export function performance_model_switch(on_off: switch_enum) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x03
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        switch (on_off) {
            case switch_enum.Turn_on:
                commands_buffer[5] = 0x01
                break
            case switch_enum.Turn_off:
                commands_buffer[5] = 0x00
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + 0x03 + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    export function servo_setting_robotArm(on_off: servo_switch_enum) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x20
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        if (on_off == servo_switch_enum.Load)
            commands_buffer[5] = 0x25
        else
            commands_buffer[5] = 0x15

        commands_buffer[6] = ~(0x09 + 0x00 + 0x20 + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
        basic.pause(50)
    }

}

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
basic.showNumber(CLAMPCLOSED)
                break
            case Message.ClampOpen:
                xgo.Manipulator_clamp(CLAMPOPEN)
basic.showNumber(CLAMPOPEN)
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

    //% subcategory="Robotarm"
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

    //% subcategory="Robotarm"
    //% block="%state the clamp"
    //% block.loc.nl="%state de grijper"
    export function clamp(state: ClampState) {
        switch (state) {
            case ClampState.Open: MESSAGE = Message.ClampOpen; break;
            case ClampState.Close: MESSAGE = Message.ClampClose; break;
        }
        if (!PAUSE) handleMessage()
    }

    //% subcategory="Robotarm"
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

    //% subcategory="Wave"
    //% block="position"
    //% block.loc.nl="positie"
    export function position(): number {
        return POSITION
    }

    //% subcategory="Wave"
    //% block="follow at %pos"
    //% block.loc.nl="volg op %pos"
    export function setPosition(pos: Position) {
        POSITION = pos + 1
    }

    //% subcategory="Wave"
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

    //% block="stop"
    //% block.loc.nl="stop"
    export function stop() {
        MESSAGE = Message.Stop
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

    //% subcategory="Uitleg"
    //% color="#008800"
    //% block="comment: %dummy"
    //% block.loc.nl="uitleg: %dummy"
    //% min.defl="schrijf hier je uitleg"
    export function comment(dummy: string) {
    }

}
