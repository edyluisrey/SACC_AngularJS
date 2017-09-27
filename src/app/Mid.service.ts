import { Injectable } from '@angular/core';

interface IWindow {
  location: {
    protocol: string,
    host: string,
    hash: string
  }
}

function _window(): IWindow {
  return window;
}

@Injectable()
export class MiddleService {
  get nativeWindow(): IWindow {
    return _window();
  }
}
