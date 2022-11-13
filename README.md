
# Multi step checkout form

Coding challenge.


## Requriments:

### 1. Form should have the following fields:

- Personal Details
  - Firstname and surname
  - Email
  - Phone number
- Address
   - Street and number
   - Zipcode and city
   - Country
- Payment
   - Credit card holder name
   - Credit card number
   - Expiry date
   - Security code

### 2. Functionality:

- Each field is required and should be sensibly validated.
- Each of the three steps should indicate in the overview if its containing fields are valid. 
- The user should be able to switch between steps 
- The user should not be able to submit the form if any field is invalid.
- It should be clear from any step, which other steps need attention.
## Run Locally:

Clone the project

```bash
  git clone https://github.com/ogodeverest/multi-step-checkout-form.git
```

Go to the project directory

```bash
  cd multi-step-checkout-form
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn run dev
```


## Tech Stack

 - **vite:** For build tool.
 - **typescript**: For typed JavaScript.
 - **React:** For UI library.
 - **hookform**: For form state handling.
 - **card-validator**:  For credit card form validation by braintree.
 - **credit-cad-type**: For credit card dedection by braintree.
 - **framer-motion**: For animations.
 - **react-feather**: For icons.
 - **react-toastify** : For toasters and notifications.
 - **react-tooltip** : For tooltip component.
 - **styled-components** : For styling.
 - **yup** : For creating validation schemas.
 - **prop-types** : For checking react prop types.


  







## Documentation

I considered the following while I coded this challenge:

- Component and code reusabilty
- Optimization 
- Functionality
- User Experience
- User Interface
- Code Quality
- Structured files and folders


### Component and code reusabilty


Global app components are found in /src/components and are referred to in the application as @components. They serve as both the foundation and other elements of the checkout form.

Examples:
- FormControl: holds the structure and styling for the standard form elements, such as select or input. Additionally, it shows helpText, ornaments, and icons. Custom elements with various element references, such as Input and Select, can be created using form controls.
- CircleButton: Specifies a special button that could accept an icon as inner content. It offers unique aesthetics and expands the functionality of standard buttons.All button elements on the form, as well as Step component, use the CircleButton component.
- Stepper : The compound component known as a stepper has been carefully engineered for high performance. It's also crucial to keep in mind that the props it takes must be optimised as well. It is completely responsive and renders several step points using Step components. One of the more complex React patterns is a compound component, which uses an interesting method of communicating the relationship between UI components and sharing implicit state by utilising an explicit parent-child relationship.
- useStepFormData: For each step of the form information about the current step is extracted in a custom hook called useStepFormData located in src/hooks or just @hooks.This custom hook is built on top of formhook library and it is used throughout all form components to extract relevant step data.


### Optimization

  - Expensive computation and props are wrapped up in useCallback hook and useMemo hook. Components that might re-render unnecessarily, like Stepper  are wrapped with memo higher order component, and expect the props to be optimised as well. Parts of the checkout form like Steps, Footer or Content will only re-render if the state that affects them is changed.


### User Experience and User Interface:
- User interface and experience are taken into consideration as components are created from scratch. Depending on their condition, buttons, tooltips, toasts, and form controls display various visuals. Keyboard and clicking can be used to move around the stepper component. There is also success-indicating text and helper text for each input. User insights into the component's state are provided by the active and hover states.

### Code quality:

-  TypeScript adds additional syntax to JavaScript to support a tighter integration with the editor by catching errors early.
-  Foundation for adding test cases is set with: Vitest and react-testing-library.

### Functionality:

- Each field is sensibly validated.
- Fields like name, last name, street are dificult to validate cause of different symbols and characters each language allows and regExp would not provide a sufficent solution. 
- Each of the three steps indicates in the overview if its containing fields are valid. 
- User is be able to switch between steps 
- User is not  able to submit the form if any field is invalid.
- It is clear from any step, which other steps need attention.
- Card number is detected and the card type logo is displayed.
- Country and city fields are dynamic.City is dependent on country.
- User can navigate the stepper with keyboard. 

### Structure:

- components : Hold svarious global components that will be used in the entire app.
- hooks: Holds reusable react logic that can be shared in different components.
- styles: Holds app Global Styles and different styled components that will be used globaly.
- test: Holds test setup files and mocks.
- views: Holds different app views that might also contain their own local components folder.
- Barrell exports are used: A barrel enables to consolidate, or roll up, exports from multiple files or modules into one single module. Barrels streamline imports, simplify exports, and help to avoid a lot of clutter in the codebase.

