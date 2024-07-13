import { Injectable } from '@angular/core';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  url = 'http://localhost:3000/courses';

  async getAllCourses(): Promise<Course[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getCourseById(id: number): Promise<Course | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Course application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }

  processPayment(courseId: number): Promise<boolean> {
    return new Promise((resolve) => {
    console.log("INSIDE processPayment");
    const recipient = 'FConvaPabkPXxesGSuyGKUoFdSykC2eDJzFtHWdSQnyF';
    const tokenMintAccount = '4giddJMmCaMCpexu6we3CToPeJwVMhnqKaj8GDQsMKmm';
    const tokenMintATA = 'EYy1bex8h4ZCcEqfqkVHjhMVyYHANQATePc8GdGhTdbu';

    alert('EFFETTUO IL PAGAMENTO');
    console.log(
      `🔑 Loaded our keypair securely, using an env file! Our public key is: $}\n🔑 Loaded sender: ${tokenMintAccount}\n🔑 Loaded recipient: ${recipient}`
    );
    resolve(true);
    });
  }
}
