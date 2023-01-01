# ONLINE BOOKING APP

#### **Video Demo**:  <https://youtu.be/hU1TNWC_eOY>
#### **Description**: An Online Booking app that allows SMBs & service professionals to offer online service booking to their customers, as well as a back-end to manage their services, work-hours, prices, appointments and customers. It also offers a dynamic, responsive and beautiful website, integrated with the backend.

---

## **1. Intro & Overview**

---

### **1.1 Product scope**

The app allows professionals and SMBs to offer their customers to book services directly on a business website. The front-end presents an intuitive, clean and beautifully stylized interface for the customer, to book a service and enter details in a fast & easy to understand animated and interactive form-based wizard.

In the admin area, the user is able to manage appointments, create new services, manage prices, working hours and check customer activity in a dashboard. Also, the user may set Business details and contact information that will then be updated & displayed in the website.

---

### **1.2 Product value**

For business owners, the value lies on increase sales & decrease appointment cancelations, as well as to save time and stop interruptions to answer the phone just to book appointments. Since the app books the apointments automatically, and the customer is presented with the available time slots, it frees the business owner up, to focus on delivering the service and provide their customers with a better experience.

For business' customers, the app offers them a better experience to book services faster and easier at the time they need, without having to wait until the phone is answered or the business opens.

| **Benefits for Businesses** | **Benefits for Customers** |
| ----------- | ----------- |
| Offer a better experience to their customers | Enjoy a better service booking experience |
| Save time when booking appointments | Book their services faster & at any hour |
| Increase sales through differentiation from competitors | Enjoy an easier & clearer booking process |
| Have better control of their time and service time slots | Have real-time info about their appointment status |

---

### **1.3 Intended audience**

The intended market for the app are professionals and SMBs that offer services that need a previous appointment, some of the audiences are:

- Doctors & Clinics
- Dentists
- Mental Health Professionals
- Therapists
- Beauty Parlors

---

### **1.4 Intended use**

**Intended use for business' customers**:

- Select the desired service and the day & hour to book it, from the available time slots.
- Register into the business customers list, by entering their name and phone.

**Intended use for businesses**:

- Offer automated online booking on their website.
- Manage appointments by confirming, rejecting or cancelling them
- Build a customer list, automatically built from appointment requests
- Configure & manage their services, customers and available service hours from their app back-end.
- Check service stats such as appointments by day/price/service and customer loyalty.
- Automatically update Business contact & working hours information, displayed in the website, through the app back-end.

---

### **1.5 General description**

An Online Booking app that allows SMBs & service professionals to offer online service booking to their customers, as well as a back-end to manage their services, work-hours, prices, appointments and customers. It also offers a dynamic, responsive and beautiful website integrated with the backend.

**App features for business' customers**:

- Select the desired service, day & hour on available service time slots.
- Automatically register in the Business' customer list when requesting an appointment.

**App features for businesses**:

- Offer automated online booking on their website
- Manage their service appointments on the app back-end:
  - Confirm, change, cancel or reject appointments
  - Sort by status, customer or service
- Configure services and working hours:
  - Create & edit services
  - Define & change service prices and duration
- Manage website information from the back-end:
  - Set business contact information
  - Set website brand details such as name and tagline
- Check service & appointment statistics
  - Visualize appointments in real-time by status and for each service
- Build a customer list automatically
  - Register name & phone number of each person that has requested an appointment
  - Search a customer by name or phone number

---

## **2. Installation & Setup**

---

### **2.1 Installation**

The app runs on a **Django** backend and uses **React** for the frontend. To install the app follow these steps:

- Open the `shell` terminal
- Go to your CS50-Codespaces or server root directory
- Install the latest version of `django`, a python framework that greatly reduces backend development time and complexity

  ``` shell
    pip install django
  ```

- Install `pytz`, a python library to manage time zones

  ``` shell
    pip install pytz
  ```

- Make sure you have node, npm and webpack installed in your server, before continuing.
- Move to the app folder, and then run the following command to install the frontend app:

  ``` shell
    npm install
  ```

---

### **2.2 Setup**

Now the app dependencies should be installed. The next step is to setup django migrations and a superadmin user to be able to access the admin area of the app. Do the following:

- Make sure you're in the app main folder.
- Create Django migrations by executing the following code in the `shell`:

  ``` shell
      python manage.py makemigrations eventcalendar
      python manage.py makemigrations
      python manage.py migrate
  ```

- Create a Super Admin:

  ``` shell
      python manage.py createsuperuser
  ```

- Follow the prompts to provide a username, password and email. Keep those credentials in a safe place and use them to log into the admin area.

---

### **2.3 Run the backend server**

---

First, compile the frontend `react` and `scss` source files, by running the following command in the main app folder once:

  ``` shell
      npm run build
  ```

- This will compile the source files and generate production `javascript` and `css` files
- You may close this `shell` if desired

Now the app should be able to run, for that simply command Django to start the server, by executing the following steps:

- Go to the app main folder
- In the `shell` start a Django server:

  ``` shell
      python manage.py runserver
  ```

- You may now access the webapp in the `url` provided by the Django server.
- If you're running a local server, the typical url for the webapp is `http://127.0.0.1:8000/`, however it's better that you use the `url` Django provided you after starting the server.
- The admin area is accessed on `<url>/admin` where `<url>` is the root web url for the app, that Django generate.
  - Log here with the super user credentials you created in the last step.

---

### **2.4 Run a frontend development server**

---

If you want to be able to modify `react` or `scss` source files, then start a development server for the frontend, by doing the following:

- Open a new shell.
- Navigate to the main app folder.
- Start a development frontend server, that will compile React and SCSS files if any of the source files are changed:

  ``` shell
      npm run dev
  ```

- You may close this `shell` window once you're done modifying source frontend files, the app will still run as long as `django`'s server is running.

---

## **3. App Code & Tech Structure**

---

### **3.1 App technology stack**

The app is running on a **Django** backend with a **React** + **Sass/SCSS** frontend. The frontend uses a modern JavaScript pipeline managed by **Webpack**, to allow using modern `javascript` and `css` frameworks.

The JavaScript pipeline (for **React** & **Sass/SCSS**) is setup in our Django project and uses the output compiled files as static assets in Django's template system.

This stack was chosen due to the ease of coding complex & dynamic frontends that **React** offers, and **Sass/SCSS** was used to streamline the styles coding process allowing using modular `*.scss` files for each **React** component.
By integrating **React** + modular `*.scss` files, styling each component was easier and the scope was properly managed.

![FrontEnd-BackEnd integration](https://www.saaspegasus.com/static/images/web/modern-javascript/js-pipeline-with-django.png)

---

### **3.2 Frontend source files**

The frontend source files are comprised of React's `*.jsx` and Sass `*.scss` files, together with a main `javascript` file that functions as a unique entry point for `JSX` & `SCSS` compilers.

This is the frontend file & folder structure, starting from the app root folder:

- `package.json`: `npm` package configuration file, where all the app dependencies are specified, as well as development and production scripts to compile the frontend files. You may modify this if you want to add more compiling steps such as minifying, prefixing and such.
- `webpack.config.js`: `webpack` setup file, that tells webpack which programs to run and where to output the final compiled `.js` and `.css` files. For this app, the output compiling folder is the `/static/` folder used by Django to serve static files.
- `/static/`: Contains all static files such as the final compiled `.js` and `.css` files.
  - `/images/`: The website images are stored and served from this folder, by Django.
  - `main.js`: This is the final compiled `javascript` file that webpack generates from `React`'s source files.
  - `main.css`: This is the final compiled `css` file that webpack generates from `SCSS` source files.
- `/front-end/`: this folder contains the source code for the frontend, including `React` and `SCSS` sources.
  - `/index.js`: this is the entry point for the compiler and the main `React`s `App` component is rendered here.
  - `/components/`: Contains all `React` components, with their `*.jsx` and `.scss` modular style files
    - `App.jsx`: Contains the main app frontend code
    - `AppContext.jsx`: This is the app context that is shared throughout app's children components. It works like a centralized source of truth for the most important app variables.
    - `App.module.scss`: App global styles, modular `*.scss` file
    - `/Button/`: A button component, that receives the `onClick` function, icon and text through props
    - `/Calendar/`: Contains all the components to render the month day picker and time block picker, to select the desired appointment block & day.
    - `/Modal/`: Component that allows the "pop-up" full screen effect, for the appointment booking wizard.
    - `/Website/`: Renders the static website, it contains all of the website's sections
    - `/WizardForm/`: Renders a Wizard-type form, where each field is contained on its own page, and it has a summary page at the end.
  - `/sass/`: App global styles, that are applied by default. For this app, the styles are mainly applied at the component level by the `.module.scss` files, however you may set global brand styles here, if you prefer that angle.
    - `main.scss`: Consolidates all of the global app partial `.scss` files
    - `_variables.scss`: Defines global variables, such as colors, typography, margins, etc.
    - `_base.scss`: Sets global styles for common components such as the `html`, `body`

---

### **3.3 Backend source files**

The main app for `django` is `booking`, however all the functionalities for online appointments is performed by `eventcalendar`. I've chosen to keep all of the appointment booking functionalities inside an individual `django` app, to allow a more modular approach in case future apps are added, such as a dashboard, crm or notification modules.

The backend source files are the ones used by Django, except for `helpers.py` which was added for custom functions.

This is the backend file & folder structure, starting from the app root folder:

- `db.sqlite3`: App's `SQLite` database, if you downloaded the project there will be test data in there. If you have a fresh installation of the app and this file doesn't appear, don't forget to generate the model migrations first, then create a superuser and a main business for the app to start working.
- `manage.py`: Don't touch this file, this is automatically generated by `Django` and it's used to run and install the app using `Django`.
- `/booking/`: This is the main app, it has no features other than integrating the modular apps, such as `eventcalendar` (which integrates all of the backend features of this projecy)
  - `settings.py`: There are several configurations that were updated, for the app to be able to run:
    - Add your localhost or codespaces domain inside `CSRF_TRUSTED_ORIGINS`
    - `eventcalendar` and the `pytz` python library (for timezones) were added inside `INSTALLED_APPS`
    - `'DIRS': [BASE_DIR / 'templates']` was set inside `TEMPLATES`, to define a single folder for all of the app templates. If you add more templates, make sure to save them inside the `/templates` folder, from the app root.
    - `STATIC_URL = 'static/'` defines the folder to serve all static files. If you add images or any static asset, make sure to save them inside the `/static` folder, since `Django` will serve them from this unique folder. The following setting was also updated to define the `static` directory:

      ``` python
      STATICFILES_DIRS = [
      BASE_DIR / 'static',
      ]
      ```

    - `AUTH_USER_MODEL = "eventcalendar.User"` was set to set the `User` model inside `eventcalendar` as the main auth user model for the entire app.

  - `urls.py`: Defines the main app url routes, `eventcalendar` urls are added here. `/` is routed to be managed by `eventcalendar`.
- `/eventcalendar/`: This is the modular app that incorporates all of the features this app offers in this version.
  - `admin.py`: The admin backend area is setup here. The main models from `eventcalendar` were added and configured here, so that the admin user could create, update and delete customers, services, appointments and even manage the Business general & contact information, as well as working hours. Modify this file if you want to tweek the admin backend area.
  - `helpers.py`: A collection of functions were added on this file, to help generating time blocks and manipulating datetime objects.
  - `models.py`: The `eventcalendar` models (database objects) are defined here, as well as the fields for each model and validations.
  - `tests.py`: This file isn't used for now, modify this file if you want to perform tests to make sure the app runs correctly after an update.
  - `urls.py`: The API paths and website url are defined here.
  - `views.py`: The main server logic is coded here, to process incoming requests, check and update the database, render the html templates and build server data responses to the frontend.
- `/templates/`: Contains all the templates the app uses. Save any new template here, regardless if they belong to a new module app. You'll notice we have only 1 template and 1 layout; the reason is because the frontend is rendered almost 100% by `React`, and `Django` just posts context variables in the `html` (such as the `CSRF`) that `React` gathers before rendering.
  - `index.html`: Renders the main website. The initial context and `CSRF` is posted here by the backend, and the `html` element with `id="app"` is inserted here, so that `React` may render the entire app in this template.
  - `layout.html`: Defines the base html for any other `html` template in the app. The following lines link the templates with the `javascript` and `css` files that `webpack` compiled and saved inside `/static`:

    ``` html
    <!-- Bundled SCSS & CSS by Webpack (insert within the <head>) -->
    <link href="{% static 'main.css' %}" rel="stylesheet">

    <!-- Bundled JS by Webpack (insert right before the </body> closing tag) -->
    <script src="{% static 'main.js' %}"></script>
    ```

---

## **4. Resources**

---

### **Django & React**

- [Django Best Practices](https://django-best-practices.readthedocs.io/en/latest/index.html)
- [Django Reusable Apps - Google Developers Video](https://www.youtube.com/watch?v=A-S0tqpPga4)
- [Built a React application in a Django project](https://www.saaspegasus.com/guides/modern-javascript-for-django-developers/integrating-django-react/)
- [Django integration with React through templates](https://dev.to/kozlovzxc/django-templates-with-react-4hko)

### **Front-End**

- [Webpack Quick Guide (Spanish)](https://desarrolloweb.com/manuales/manual-webpack.html): check article 5 & 6 to setup CSS and Sass compilation with webpack.
- [Adding React's SCSS & CSS Modules with Webdev](https://adamrackis.dev/blog/css-modules)
- [Setting up CSS & Sass with Webpack](https://dev.to/deepanjangh/setting-up-css-and-sass-with-webpack-3cg): Goes into more detail for production-ready configurations.

### **React documentation**

- [React's Documentation](https://reactjs.org/docs/getting-started.html)
- [React's Strict Mode](https://reactjs.org/docs/strict-mode.html)