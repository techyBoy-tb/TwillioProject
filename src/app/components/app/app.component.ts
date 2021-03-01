import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/service/api/api.service';
import { FormService } from 'src/app/service/form/form.service';
import { createLocalVideoTrack } from 'twilio-video';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'twilio-project';
  @ViewChild('preview', { static: false }) previewElement: ElementRef;

  constructor(private apiService: ApiService, public formService: FormService, private render: Renderer2) { }

  public roomInfo: FormGroup = this.formService.getRoomInfo();

  ngOnInit(): void {
    this.initializeCamera();
  }

  async initializeCamera(): Promise<void> {
    const videoTrack = await createLocalVideoTrack();
    const videoElement = videoTrack.attach();
    this.render.setStyle(videoElement, 'height', '640px');
    this.render.setStyle(videoElement, 'width', '640px');
    this.render.appendChild(this.previewElement.nativeElement, videoElement);
  }

  doThis() {
    const personName = this.roomInfo.get('personName').value.replaceAll(" ", "");
    const roomName = this.roomInfo.get('roomName').value.replaceAll(" ", "");

    const accessToken = this.apiService.getAccessToken(personName, roomName).subscribe(async res => {
      const token = res.token;
      this.apiService.joinOrCreateRoom(token.toString()).then(resp => {
      });
      // this.apiService.createRoom(token.toString());
    });


    // const client = connect(this.accountSid, this.authToken);
    // connect.viderooms.create({ uniqueName: 'DailyStandup' })
    // .then(room => o.console.log(room.sid));
  }
}
