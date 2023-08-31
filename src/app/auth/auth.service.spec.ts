import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { AuthService } from "./auth.services"
import { User } from "../dashboard/pages/users/models"
import { Router } from "@angular/router"
import { RouterMock } from "../core/mocks/router.mock"
import { MockProvider } from 'ng-mocks';
import { Store } from "@ngrx/store"

xdescribe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        MockProvider(Router),
        MockProvider(Store),
      ]
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    httpController.verify();
  })

  it('Si el login es valido el observable authUser$ debe emitir un valor', (done) => {
    const mockUser: User = {
      id: 1,
      email: 'fake@mail.com',
      password: '123456',
      name: 'FAKE',
      surname: 'USER',
      token: 'skj3kjsdiamsdasj',
    }

    const mockResponse: User[] = [mockUser];

    service.login({
      email: mockUser.email,
      password: mockUser.password
    });

    httpController.expectOne({
      method: 'GET',
      url: `http://localhost:3000/users?email=${mockUser.email}&password=${mockUser.password}`
    }).flush(mockResponse)

    service.authUser$.subscribe({
      next: (authUser) => {
        expect(authUser).toBeTruthy();
        expect(authUser).toEqual(mockUser);
        done();
      }
    })
  })
})

