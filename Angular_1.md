## Day 1 - Angular
Follow the [instruction here](https://www.youtube.com/watch?v=5pFKw5iLL4s&list=PLVfq1luIZbSmJIuw_EZVP9mFiMED5fGIn&ab_channel=ThomasOliver)

```
npm install -g @angular/cli
ng new ng-blog
cd ng-blog
ng add @angular/material    (remeber to use SCSS schema)
npm install bootstrap --save
```

Note: [2:32] Adding bootstrap-grid.min.css [path](https://appdividend.com/2018/12/06/how-to-use-sass-in-angular-7-tutorial-example/) also [here](https://dev.to/myolisi/how-to-add-bootstrap-5-to-your-angular-11-project-1am2)

### VSCode
* [8:34] Use plugin ESLint & Angular Snippets (v12)
* Dùng multi-cursor (Ctrl-D)

Module có thể có nhiều Components
* PostList dùng [MatCard](https://material.angular.io/components/card/examples)

Have to add schemas: [ CUSTOM_ELEMENTS_SCHEMA ] as [instructed here](https://newbedev.com/angular-11-is-a-web-component-then-add-custom-elements-schema-to-the-ngmodule-schemas-of-this-component-to-suppress-this-message-code-example)
