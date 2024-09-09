#FRONT END - UI APPLICATION cafe-employee
NOTE
1. Three Pages were created - Cafe Page and Employee Page with a HomePage as Entry Page 
2. Development done using typescript.
3. Redux and Trunk was used to manage REST API call
4. The proposed Tanstack Router for views management has problem in execution so has been switch to react-router-dom.
5. Instead of using Tanstack Query for state-management/fetch, a more stable Redux was used.
6. Add/Edit Page was integrated into the Cafe and EmployeePage but can be made a component and imported for use
7. Formik was used for Form and Validation.
8. The Cafe-Employee Relationship is defined in Employee Page for update or Creation of new Employee (Valid CafeId will be 
     verified from Front end before allowed to send request to backend)
9. Not much CSS was used in the Page building except for Control of Formik Field and Error Message styling. Nevertheless the framework for 
    further enhancement is possible
10. Operation/Demo available
  - list of all Cafe
  - New, Edit & Delete of Cafe
  - list of all Employee of Cafe
  - New, Edit & Delete of Employee
  - Update of Employee Start Date, Cafe Id
11. Cafe Page use MaterialUI table, whereas Emplotee Page use AGGridReact
12. Source Code Maintained by Git

#SETUP
1. login to cafe-employee
2. type npm install
3. type npm run dev
4. open browser and type http://localhost:5173/
