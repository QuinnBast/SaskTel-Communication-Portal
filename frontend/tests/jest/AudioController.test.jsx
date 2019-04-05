import React from 'react';
import { mount, shallow } from 'enzyme';
import AudioController from '../../js/comps/AudioController';

describe("App", () => {

    it('constructs', () => {
        let ac = AudioController;
    });

    it('plays audio', () => {
        AudioController.play('tone_click');
        AudioController.play('tone_0');
        AudioController.play('tone_1');
        AudioController.play('tone_2');
        AudioController.play('tone_3');
        AudioController.play('tone_4');
        AudioController.play('tone_5');
        AudioController.play('tone_6');
        AudioController.play('tone_7');
        AudioController.play('tone_8');
        AudioController.play('tone_9');
        AudioController.play('tone_busy');
        AudioController.play('tone_pound');
        AudioController.play('tone_ringback');
        AudioController.play('tone_star');
        AudioController.play('tone_ringtone');
        AudioController.play('tone_ringtone');
        AudioController.stop('tone_ringtone');
    })
});