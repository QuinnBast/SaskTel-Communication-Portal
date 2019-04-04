/**
 * Audio file imports
 */
import tone_click from "../../assets/media/click.ogg"
import tone_0 from "../../assets/media/dtmf-0.ogg"
import tone_1 from "../../assets/media/dtmf-1.ogg"
import tone_2 from "../../assets/media/dtmf-2.ogg"
import tone_3 from "../../assets/media/dtmf-3.ogg"
import tone_4 from "../../assets/media/dtmf-4.ogg"
import tone_5 from "../../assets/media/dtmf-5.ogg"
import tone_6 from "../../assets/media/dtmf-6.ogg"
import tone_7 from "../../assets/media/dtmf-7.ogg"
import tone_8 from "../../assets/media/dtmf-8.ogg"
import tone_9 from "../../assets/media/dtmf-9.ogg"

import tone_busy from "../../assets/media/dtmf-busy.ogg"
import tone_pound from "../../assets/media/dtmf-pound.ogg"
import tone_ringback from "../../assets/media/dtmf-ringback.ogg"
import tone_star from "../../assets/media/dtmf-star.ogg"
import tone_ringtone from "../../assets/media/ringtone.ogg"

class AudioController {

    constructor(){
        this.audio = []
    }

    play(toneName, looped){

        for(let audio of this.audio){
            if(audio['audioName'] === toneName){
                return;
            }
        }

        let audio = null;
        switch(toneName){
            case "tone_click":
                audio = new Audio(tone_click);
                break;
            case "tone_0":
                audio = new Audio(tone_0);
                break;
            case "tone_1":
                audio = new Audio(tone_1);
                break;
            case "tone_2":
                audio = new Audio(tone_2);
                break;
            case "tone_3":
                audio = new Audio(tone_3);
                break;
            case "tone_4":
                audio = new Audio(tone_4);
                break;
            case "tone_5":
                audio = new Audio(tone_5);
                break;
            case "tone_6":
                audio = new Audio(tone_6);
                break;
            case "tone_7":
                audio = new Audio(tone_7);
                break;
            case "tone_8":
                audio = new Audio(tone_8);
                break;
            case "tone_9":
                audio = new Audio(tone_9);
                break;
            case "tone_busy":
                audio = new Audio(tone_busy);
                break;
            case "tone_pound":
                audio = new Audio(tone_pound);
                break;
            case "tone_ringback":
                audio = new Audio(tone_ringback);
                break;
            case "tone_star":
                audio = new Audio(tone_star);
                break;
            case "tone_ringtone":
                audio = new Audio(tone_ringtone);
                break;
        }
        audio.type = "audio/ogg";
        audio.loop = looped;
        audio.play();

        if(!looped){
            let self = this;
            audio.onended = function(){
                self.stop(toneName);
            }
        }

        this.audio.push({audioName: toneName, audio: audio});
    }

    stop(toneName){
        let index = 0;
        for( let audio of this.audio){
            if(audio['audioName'] === toneName){
                audio['audio'].pause();
                audio['audio'].currentTime = 0;
                this.audio.splice(index, 1);
            }
            index = index + 1
        }
    }

}

export default new AudioController();