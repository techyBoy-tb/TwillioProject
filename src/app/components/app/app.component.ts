import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/service/api/api.service';
import { FormService } from 'src/app/service/form/form.service';
import { createLocalVideoTrack } from 'twilio-video';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'twilio-project';
  loading: boolean = true;
  roomName: string = '';
  @ViewChild('remoteParticipants', { static: false }) previewElement: ElementRef;

  constructor(private apiService: ApiService, public formService: FormService, private render: Renderer2) { }

  public roomInfo: FormGroup = this.formService.getRoomInfo();

  async initializeCamera(): Promise<void> {
    this.loading = !this.loading;
    this.roomName = this.roomInfo.get('roomName').value.replaceAll(" ", "");
    const videoTrack = await createLocalVideoTrack();
    const videoElement = videoTrack.attach();
    this.render.setStyle(videoElement, 'height', '100%');
    this.render.setStyle(videoElement, 'width', '100%');
    this.render.appendChild(this.previewElement.nativeElement, videoElement);
  }

  async connectToRoom() {
    await this.initializeCamera().then(() => {
      const personName = this.roomInfo.get('personName').value.replaceAll(" ", "");
      const roomName = this.roomInfo.get('roomName').value.replaceAll(" ", "");

      this.apiService.getAccessToken(personName, roomName).subscribe(async res => {
        const token = res.token;
        await this.apiService.joinOrCreateRoom(token.toString()).then(resp => {
          console.log('this is the response of create join room:', resp);
        });
      });
    });
  }

  leaveRoom() {
    this.loading = !this.loading;
    this.apiService.leaveRoom();
  }
}
