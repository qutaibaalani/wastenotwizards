import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderService } from '../provider.service';

@Component({
  selector: 'app-provider-post',
  templateUrl: './provider-post.component.html',
  styleUrls: ['./provider-post.component.css']
})
export class ProviderPostComponent implements OnInit {
  postForm: FormGroup;
  pastPosts: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private providerService: ProviderService
  ) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      posted_by_user: ['', Validators.required],
      food_list: ['', Validators.required],
      monetary_value: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.getPastPosts();
  }

  getPastPosts(): void {
    const id = localStorage.getItem('id');
  
    if (!id) {
      console.error('ID not found!');
      return;
    }

    this.providerService.getPastPosts(id).subscribe((posts: any[]) => {
      this.pastPosts = posts;
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const postData = this.postForm.value;

      this.providerService.createPost(postData).subscribe(
        res => {
          console.log(res);
          this.postForm.reset();

          // Refresh the list of posts
          this.getPastPosts();
        },
        error => console.log('Error!', error)
      );
    }
  }

  // Add these methods
  editPost(post): void {
    console.log('Edit post', post);
    // Add your logic for editing a post here
  }

  deletePost(post): void {
    console.log('Delete post', post);
    // Add your logic for deleting a post here
  }
}
