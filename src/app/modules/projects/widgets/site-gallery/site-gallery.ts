import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-site-gallery',
  standalone: false,
  templateUrl: './site-gallery.html',
  styleUrl: './site-gallery.scss',
})
export class SiteGallery implements OnInit {
  @Input() projectId: string = '';
  @Input() newlyUploaded: any[] = [];
  @Output() uploadMedia = new EventEmitter<void>();

  photos = [
    { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ6m0Gz8C9mN_W-vJ4kZ7y5_u9r5t1_l8qW-o1_l8qW-o1_l8qW-o1_l8qW-o1_l8qW-o1_l8qW-o1_l8qW-o1_l8qW-o1_l8qW-o1_l8qW-o1_l8qW-o1_l8qW-o', title: 'Foundation Pouring', date: 'Oct 12, 2023', category: 'Construction' },
    { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbaknLWnXup9P__CArLmzADSnktqSRmRxR__1ZsxrPnxJr9EF89Jl7DR9wLdJkWD-2RooG8S31pUCaBOV4UpPAqHJ_WDGdy2Rt7bbYcE0JH9joLHZQYYpFdJGvsKTDmyEjWfL9YNyBJFFHMKfa7G451JHGAKUXp3Gx3b96rafJL4XhiNZqwXzweVRi82KJrzrp3loSMhGqqEFHVjtioYZUDTqQ1N76FQ7Fek0infioZQYKC9Z8_bP7uudI4eqqbK2EcNJDdfldzOZk', title: 'Steel Frame Inspection', date: 'Oct 15, 2023', category: 'Structural' },
    { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy4VSdkv6U8BtqZ6hyasfIDNpx-i808f9yWboZSUj5QY7VoQcXDQfJFoOHnBZ52ZcqnbdZQkTTffm2Ssn5grM20FAir2zJciQ3TaqKdU3GDyFia3p7j0BHkaz316xlh2PaXTQtdTPluF2dQruB3QQ0WV3GzveL5--UUvkSWIMkR1WmUE6V8hHwdGk2vtDoXMX560B0049U7JsM8xCfOTN_tZKF4jnjFL-4hP5gKpGOq8f5K9Zw8fVOQMqWc7Poik05KR6kWHOTCaa1', title: 'Site Overview - West Wing', date: 'Oct 18, 2023', category: 'General' }
  ];

  constructor() { }

  ngOnInit(): void { }
}
