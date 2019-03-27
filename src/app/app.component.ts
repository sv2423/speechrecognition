import { Component, OnInit, NgZone } from "@angular/core";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public Editor = ClassicEditor;
  title = "speechRecognition";
  recognition: SpeechRecognition;
  speechText: string;

  constructor(private zone: NgZone) {}

  ngOnInit() {
    var SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'hi-IN';
    this.recognition.onstart = function() {
      //  instructions.text('Voice this.recognition activated. Try speaking into the microphone.');
    };

    this.recognition.onspeechend = function() {
      //  instructions.text('You were quiet for a while so voice this.recognition turned itself off.');
    };

    this.recognition.onerror = function(event) {
      if (event.error == "no-speech") {
        // instructions.text('No speech was detected. Try again.');
      }
    };

    this.recognition.onresult = event => {
      this.onSpeechResult(event);
    };
  }

  public onSpeechResult(event) {
    // event is a Speechthis.recognitionEvent object.
    // It holds all the lines we have captured so far.
    // We only need the current one.
    var current = event.resultIndex;

    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;
    this.zone.run(() => {
      this.speechText = transcript;
    });
  }

  /**
   *
   */

  public onSpeechStart() {
    this.speechText = "testingggg";
    this.recognition.start();
  }

  public onSpeechStop() {
    this.speechText = "stoping";
    this.recognition.stop();
  }
}
