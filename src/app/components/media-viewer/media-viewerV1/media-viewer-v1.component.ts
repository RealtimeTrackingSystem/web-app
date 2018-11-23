import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { IMediaUpload } from '../../../interface/media-upload/media-upload.interface';
import * as _ from 'lodash';


@Component({
  selector: 'app-media-viewer-v1',
  templateUrl: './media-viewer-v1.component.html',
  styleUrls: ['./media-viewer-v1.component.scss']
})
export class MediaViewerV1Component implements OnInit, OnChanges {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  @Input() height: number;
  @Input() width: number;
  @Input() photos: IMediaUpload[] = [];

  public attachments: IMediaUpload[];
  public noImage = 'https://hlfppt.org/wp-content/uploads/2017/04/placeholder.png';

  constructor() { }

  ngOnInit() {
    console.log(this.photos);
    this.loadReportAttachments();
  }

  ngOnChanges() {
    console.log(this.photos);
    this.loadReportAttachments();
  }

  loadReportAttachments () {
    if (this.photos) {
      this.galleryOptions = [
        {
            width: `${(this.width) ? this.width : 400}px`,
            height: `${(this.height) ? this.height : 300}px`,
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide
        },
        // max-width 800
        {
            breakpoint: 500,
            width: '100%',
            height: '600px',
            imagePercent: 80,
            thumbnailsPercent: 20,
            thumbnailsMargin: 20,
            thumbnailMargin: 20
        },
        // max-width 400
        {
            breakpoint: 400,
            preview: false
        }
      ];

      if (this.photos.length !== 0) {
        this.galleryImages = _.map(this.photos, (a) => {
          return { small: a.metaData.secure_url, medium: a.metaData.secure_url, big: a.metaData.secure_url };
        });
      } else {
        this.galleryImages = [
          {small: this.noImage, medium: this.noImage, big: this.noImage}
        ];
      }
    }
  }
}

