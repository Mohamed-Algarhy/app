import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
 import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly httpClient = inject(HttpClient);

  getPostComments(postId: string , limit:number): Observable<any> {
    // بناء الـ URL بناءً على ما هو موجود في Postman
    const url = `${environment.baseURL}/posts/${postId}/comments?page=1&limit=10`;

    // إرسال التوكن في الهيدر (مع التأكد من المفتاح المخزن في الـ localStorage لديك، سواء 'token' أو 'usertoken')
    const headers = new HttpHeaders({
      token: localStorage.getItem('usertoken') || '',
      // أو إذا كان الـ API يتطلب Authorization Bearer:
      // 'Authorization': `Bearer ${localStorage.getItem('usertoken')}`
    });

    return this.httpClient.get(url, { headers });
  }
}
