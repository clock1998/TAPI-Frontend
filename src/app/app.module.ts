import {ErrorInterceptor } from './core/helpers/error.interceptor'
import {JwtInterceptor } from './core/helpers/jwt.interceptor'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './modules/home/pages/landing/landing.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { AboutComponent } from './modules/about/pages/about/about.component';
import { GalleryComponent } from './modules/gallery/pages/gallery/gallery.component';
import { YbdlComponent } from './modules/ybdl/pages/ybdl/ybdl.component';
import { ImageComponent } from './modules/gallery/components/image/image.component';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginComponent } from './modules/login/pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './modules/admin/pages/dashboard/dashboard.component';
import { BlogComponent } from './modules/blog//blog/blog.component';
import { PostComponent } from './modules/blog/post/post.component';
import { PostDetailComponent } from './modules/blog/post-detail/post-detail.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
	declarations: [
		AppComponent,
		LandingComponent,
		NavbarComponent,
		FooterComponent,
		AboutComponent,
		GalleryComponent,
		YbdlComponent,
		ImageComponent,
		LoginComponent,
		DashboardComponent,
		BlogComponent,
		PostComponent,
		PostDetailComponent,
	],
	imports: [
		CKEditorModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		MatProgressBarModule,
        ReactiveFormsModule,
        MatChipsModule,
        MatAutocompleteModule
	],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
