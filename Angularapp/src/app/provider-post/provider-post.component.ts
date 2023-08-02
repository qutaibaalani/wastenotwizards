import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderService } from '../provider.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-provider-post',
  templateUrl: './provider-post.component.html',
  styleUrls: ['./provider-post.component.css'],
})
export class ProviderPostComponent implements OnInit {
  postForm: FormGroup;
  pastPosts: any[] = [];
  displayedColumns: string[] = ['food_list', 'reservation_status', 'isClosed'];
  dataSource: MatTableDataSource<any>;

  // Init this property to false to hide the form at page load
  showPostForm = false;

  constructor(private fb: FormBuilder, private providerService: ProviderService) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      posted_by_user: ['', Validators.required],
      food_list: ['', Validators.required],
      monetary_value: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.getPastPosts();
  }

  // nd method to toggle the form
  togglePostForm(): void {
    this.showPostForm = !this.showPostForm;
  }

  getPastPosts(): void {
    const id = localStorage.getItem('id');

    if (!id) {
      console.error('ID not found!');
      return;
    }

    this.providerService.getPastPosts(id).subscribe((posts: any[]) => {
      this.pastPosts = posts;
      this.dataSource = new MatTableDataSource(this.pastPosts);
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const postData = this.postForm.value;

      this.providerService.createPost(postData).subscribe(
        (res) => {
          console.log(res);
          this.postForm.reset();
          this.getPastPosts();
        },
        (error) => console.log('Error!', error)
      );
    }
  }
}

