"use strict";(self.webpackChunkClient=self.webpackChunkClient||[]).push([[301],{301:(E,d,i)=>{i.r(d),i.d(d,{AccountModule:()=>I});var c=i(177),l=i(8498),s=i(9417),t=i(4438),m=i(6672);function b(e,a){if(1&e&&(t.j41(0,"div",4),t.EFF(1),t.k0s()),2&e){const n=t.XpG();t.R7$(),t.SpI(" Please enter your ",n.label,"")}}function h(e,a){1&e&&(t.j41(0,"div",4),t.EFF(1,"Invalid email address"),t.k0s())}function C(e,a){1&e&&(t.j41(0,"div",4),t.EFF(1,"Password not complex enough"),t.k0s())}let g=(()=>{class e{constructor(n){this.controlDir=n,this.type="text",this.label="",this.controlDir.valueAccessor=this}writeValue(n){}registerOnChange(n){}registerOnTouched(n){}get control(){return this.controlDir.control}static#t=this.\u0275fac=function(r){return new(r||e)(t.rXU(s.vO,2))};static#e=this.\u0275cmp=t.VBU({type:e,selectors:[["app-text-input"]],inputs:{type:"type",label:"label"},decls:7,vars:8,consts:[[1,"form-floating","mb-3"],[1,"form-control",3,"type","formControl","placeholder","ngClass"],["for","email"],["class","invalid-feedback",4,"ngIf"],[1,"invalid-feedback"]],template:function(r,o){1&r&&(t.j41(0,"div",0),t.nrm(1,"input",1),t.j41(2,"label",2),t.EFF(3),t.k0s(),t.DNE(4,b,2,1,"div",3)(5,h,2,0,"div",3)(6,C,2,0,"div",3),t.k0s()),2&r&&(t.R7$(),t.FS9("type",o.type),t.FS9("placeholder",o.label),t.Y8G("formControl",o.control)("ngClass",o.control.touched?o.control.invalid?"is-invalid":"is-valid":null),t.R7$(2),t.JRh(o.label),t.R7$(),t.Y8G("ngIf",null==o.control.errors?null:o.control.errors.required),t.R7$(),t.Y8G("ngIf",null==o.control.errors?null:o.control.errors.email),t.R7$(),t.Y8G("ngIf",null==o.control.errors?null:o.control.errors.pattern))},dependencies:[c.YU,c.bT,s.me,s.BC,s.l_],styles:["input[_ngcontent-%COMP%]{width:320px}"]})}return e})(),_=(()=>{class e{constructor(n,r,o){this.accountService=n,this.router=r,this.activatedRoute=o,this.loginForm=new s.gE({email:new s.MJ("",[s.k0.required,s.k0.email]),password:new s.MJ("",s.k0.required)}),this.returnUrl=this.activatedRoute.snapshot.queryParams.returnUrl||"/"}onSubmit(){this.accountService.login(this.loginForm.value).subscribe({next:()=>this.router.navigateByUrl(this.returnUrl)})}static#t=this.\u0275fac=function(r){return new(r||e)(t.rXU(m.D),t.rXU(l.Ix),t.rXU(l.nX))};static#e=this.\u0275cmp=t.VBU({type:e,selectors:[["app-login"]],decls:11,vars:7,consts:[[1,"content","d-flex","justify-content-center","mt-5"],[1,"content-cover","col-3"],[1,"login-form",3,"ngSubmit","formGroup"],[1,"text-center","mb-4"],[1,"mb-3"],[3,"formControl","label"],[3,"formControl","label","type"],[1,"d-grid"],["type","submit",1,"btn","btn-lg","btn-primary","mt-3",3,"disabled"]],template:function(r,o){1&r&&(t.j41(0,"div",0)(1,"div",1)(2,"form",2),t.bIt("ngSubmit",function(){return o.onSubmit()}),t.j41(3,"div",3)(4,"h1",4),t.EFF(5,"Login"),t.k0s()(),t.nrm(6,"app-text-input",5)(7,"app-text-input",6),t.j41(8,"div",7)(9,"button",8),t.EFF(10,"Log In"),t.k0s()()()()()),2&r&&(t.R7$(2),t.Y8G("formGroup",o.loginForm),t.R7$(4),t.Y8G("formControl",o.loginForm.controls.email)("label","Email"),t.R7$(),t.Y8G("formControl",o.loginForm.controls.password)("label","Password")("type","password"),t.R7$(2),t.Y8G("disabled",o.loginForm.invalid))},dependencies:[s.qT,s.BC,s.cb,s.l_,s.j4,g],styles:[".content[_ngcontent-%COMP%]{background-color:#f3f3f3;padding:20px;border-radius:10px}.content[_ngcontent-%COMP%]   .content-cover[_ngcontent-%COMP%]{background-color:#fff;padding:20px;border-radius:8px;box-shadow:0 0 10px #0000001a;margin-bottom:20px}"]})}return e})();var f=i(6850),u=i(5596);function v(e,a){if(1&e&&(t.j41(0,"li"),t.EFF(1),t.k0s()),2&e){const n=a.$implicit;t.R7$(),t.SpI(" ",n," ")}}function F(e,a){if(1&e&&(t.j41(0,"ul",7),t.DNE(1,v,2,1,"li",8),t.k0s()),2&e){const n=t.XpG();t.R7$(),t.Y8G("ngForOf",n.errors)}}let y=(()=>{class e{constructor(n,r,o){this.fb=n,this.accountService=r,this.router=o,this.errors=null,this.complexPassword="(?=^.{6,10}$)(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*s).*$",this.registerForm=this.fb.group({displayName:["",s.k0.required],email:["",[s.k0.required,s.k0.email]],password:["",[s.k0.required,s.k0.pattern(this.complexPassword)]]})}onSubmit(){this.accountService.register(this.registerForm.value).subscribe({next:()=>this.router.navigateByUrl("/home"),error:n=>this.errors=n.errors})}static#t=this.\u0275fac=function(r){return new(r||e)(t.rXU(s.ok),t.rXU(m.D),t.rXU(l.Ix))};static#e=this.\u0275cmp=t.VBU({type:e,selectors:[["app-register"]],decls:12,vars:10,consts:[[1,"content","d-flex","justify-content-flex-start"],[1,"content-cover"],[1,"login-form",3,"ngSubmit","formGroup"],[3,"formControl","label"],[3,"formControl","label","type"],["class","text-danger list-unstyled",4,"ngIf"],["type","submit",1,"btn","btn-primary",3,"disabled"],[1,"text-danger","list-unstyled"],[4,"ngFor","ngForOf"]],template:function(r,o){1&r&&(t.j41(0,"div",0)(1,"div",1)(2,"form",2),t.bIt("ngSubmit",function(){return o.onSubmit()}),t.j41(3,"h2"),t.EFF(4,"Sign Up"),t.k0s(),t.nrm(5,"app-text-input",3)(6,"app-text-input",3)(7,"app-text-input",4),t.DNE(8,F,2,1,"ul",5),t.j41(9,"div")(10,"button",6),t.EFF(11,"LogIn"),t.k0s()()()()()),2&r&&(t.R7$(2),t.Y8G("formGroup",o.registerForm),t.R7$(3),t.Y8G("formControl",o.registerForm.controls.displayName)("label","Username"),t.R7$(),t.Y8G("formControl",o.registerForm.controls.email)("label","Email"),t.R7$(),t.Y8G("formControl",o.registerForm.controls.password)("label","Password")("type","password"),t.R7$(),t.Y8G("ngIf",o.errors),t.R7$(2),t.Y8G("disabled",o.registerForm.invalid))},dependencies:[c.Sq,c.bT,s.qT,s.BC,s.cb,s.l_,s.j4,g],styles:[".content[_ngcontent-%COMP%]{margin:20px 0 10px 5px}.content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:20px;font-size:25px}"]})}return e})(),M=(()=>{class e{constructor(n,r,o){this.fb=n,this.accountService=r,this.router=o}ngOnInit(){this.updateUserForm=this.fb.group({displayName:["",s.k0.required],email:["",[s.k0.required,s.k0.email]],password:["",s.k0.minLength(6)]})}onSubmit(){this.updateUserForm.valid&&this.accountService.updateUser(this.updateUserForm.value).subscribe(()=>{console.log("User Update Great!!"),this.router.navigate(["/"])},n=>{console.error("Error: ",n),this.router.navigate(["/"])})}static#t=this.\u0275fac=function(r){return new(r||e)(t.rXU(s.ok),t.rXU(m.D),t.rXU(l.Ix))};static#e=this.\u0275cmp=t.VBU({type:e,selectors:[["app-update"]],decls:19,vars:2,consts:[[1,"content","d-flex","justify-content-flex-start"],[1,"content-cover"],[1,"update-user-form",3,"ngSubmit","formGroup"],[1,"mb-3"],["for","displayName",1,"form-label"],["type","text","id","displayName","formControlName","displayName",1,"form-control"],["for","email",1,"form-label"],["type","email","id","email","formControlName","email",1,"form-control"],["for","password",1,"form-label"],["type","password","id","password","formControlName","password",1,"form-control"],["type","submit",1,"btn","btn-primary",3,"disabled"]],template:function(r,o){1&r&&(t.j41(0,"div",0)(1,"div",1)(2,"form",2),t.bIt("ngSubmit",function(){return o.onSubmit()}),t.j41(3,"h2"),t.EFF(4,"Update User"),t.k0s(),t.j41(5,"div",3)(6,"label",4),t.EFF(7,"Display Name"),t.k0s(),t.nrm(8,"input",5),t.k0s(),t.j41(9,"div",3)(10,"label",6),t.EFF(11,"Email"),t.k0s(),t.nrm(12,"input",7),t.k0s(),t.j41(13,"div",3)(14,"label",8),t.EFF(15,"Password"),t.k0s(),t.nrm(16,"input",9),t.k0s(),t.j41(17,"button",10),t.EFF(18,"Update"),t.k0s()()()()),2&r&&(t.R7$(2),t.Y8G("formGroup",o.updateUserForm),t.R7$(15),t.Y8G("disabled",o.updateUserForm.invalid))},dependencies:[s.qT,s.me,s.BC,s.cb,s.j4,s.JD],styles:[".content[_ngcontent-%COMP%]{margin:20px 0 10px 5px}.content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:20px;font-size:25px}.content[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:320px;font-size:18px}"]})}return e})();function O(e,a){if(1&e){const n=t.RV6();t.j41(0,"tr")(1,"td"),t.EFF(2),t.k0s(),t.j41(3,"td"),t.EFF(4),t.k0s(),t.j41(5,"td"),t.EFF(6),t.k0s(),t.j41(7,"td")(8,"button",3),t.bIt("click",function(){const o=t.eBV(n).$implicit,p=t.XpG(2);return t.Njj(p.deleteCustomer(o.id))}),t.EFF(9,"Delete"),t.k0s()()()}if(2&e){const n=a.$implicit;t.R7$(2),t.JRh(n.id),t.R7$(2),t.JRh(n.displayName),t.R7$(2),t.JRh(n.email)}}function P(e,a){if(1&e&&(t.j41(0,"section")(1,"h2"),t.EFF(2,"All Users"),t.k0s(),t.j41(3,"div",1)(4,"table",2)(5,"thead")(6,"tr")(7,"th"),t.EFF(8,"Id"),t.k0s(),t.j41(9,"th"),t.EFF(10,"Username"),t.k0s(),t.j41(11,"th"),t.EFF(12,"Email"),t.k0s(),t.j41(13,"th"),t.EFF(14,"Actions"),t.k0s()()(),t.j41(15,"tbody"),t.Z7z(16,O,10,3,"tr",null,t.Vm6),t.k0s()()()()),2&e){const n=t.XpG();t.R7$(16),t.Dyx(n.users)}}let x=(()=>{class e{constructor(n){this.accountService=n}ngOnInit(){this.currentUser$=this.accountService.currentUser$,this.isAdmin$=this.accountService.isAdmin$,this.getUsers()}getUsers(){this.accountService.getUsers().subscribe({next:n=>{this.users=n,console.log(this.users)},error:n=>console.log(n)})}deleteCustomer(n){this.accountService.deleteUser(n).subscribe(()=>{this.users=this.users.filter(r=>r.id!==n),console.log(this.users)})}static#t=this.\u0275fac=function(r){return new(r||e)(t.rXU(m.D))};static#e=this.\u0275cmp=t.VBU({type:e,selectors:[["app-users"]],decls:2,vars:3,consts:[[4,"ngIf"],[1,"table-wrapper"],[1,"table","table-hover"],[1,"delete",3,"click"]],template:function(r,o){1&r&&(t.DNE(0,P,18,0,"section",0),t.nI1(1,"async")),2&r&&t.Y8G("ngIf",t.bMT(1,1,o.isAdmin$))},dependencies:[c.bT,c.Jj],styles:["section[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin:20px 0 10px 5px}section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-left:8px;font-size:25px}section[_ngcontent-%COMP%]   .table-wrapper[_ngcontent-%COMP%]{margin-top:10px;overflow-x:auto}section[_ngcontent-%COMP%]   .table-wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{border-collapse:separate;border-spacing:0;min-width:max-content}section[_ngcontent-%COMP%]   .table-wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{position:sticky;font-weight:500}section[_ngcontent-%COMP%]   .table-wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{background-color:#f3f3f3;cursor:pointer;height:50px}section[_ngcontent-%COMP%]   .table-wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:60px;height:40px;object-fit:contain}section[_ngcontent-%COMP%]   .table-wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:#fff;border:1px solid #959595;border-radius:8px;font-weight:400}section[_ngcontent-%COMP%]   .table-wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   button.delete[_ngcontent-%COMP%]:hover{background-color:#e42e2e;color:#fff;border:none}"]})}return e})();function U(e,a){1&e&&(t.j41(0,"mat-tab",4),t.nrm(1,"app-users"),t.k0s())}function k(e,a){1&e&&(t.j41(0,"mat-tab",5),t.nrm(1,"app-register"),t.k0s())}const j=[{path:"",component:(()=>{class e{constructor(n){this.accountService=n}ngOnInit(){this.currentUser$=this.accountService.currentUser$,this.isAdmin$=this.accountService.isAdmin$}static#t=this.\u0275fac=function(r){return new(r||e)(t.rXU(m.D))};static#e=this.\u0275cmp=t.VBU({type:e,selectors:[["app-account"]],decls:12,vars:6,consts:[["mat-stretch-tabs","false","mat-align-tabs","start"],["label","Account"],["label","Admin users",4,"ngIf"],["label","Register Users",4,"ngIf"],["label","Admin users"],["label","Register Users"]],template:function(r,o){1&r&&(t.j41(0,"section")(1,"mat-card")(2,"mat-card-header"),t.EFF(3," Account Management "),t.k0s(),t.j41(4,"mat-card-content")(5,"mat-tab-group",0)(6,"mat-tab",1),t.nrm(7,"app-update"),t.k0s(),t.DNE(8,U,2,0,"mat-tab",2),t.nI1(9,"async"),t.DNE(10,k,2,0,"mat-tab",3),t.nI1(11,"async"),t.k0s()()()()),2&r&&(t.R7$(8),t.Y8G("ngIf",t.bMT(9,2,o.isAdmin$)),t.R7$(2),t.Y8G("ngIf",t.bMT(11,4,o.isAdmin$)))},dependencies:[c.bT,f.mq,f.T8,u.RN,u.m2,u.MM,y,M,x,c.Jj],styles:["section[_ngcontent-%COMP%]{display:flex;justify-content:center;margin:20px}mat-card[_ngcontent-%COMP%]{width:900px}mat-card-header[_ngcontent-%COMP%]{font-size:25px;margin-bottom:10px}mat-tab[_ngcontent-%COMP%]{margin:100px}"]})}return e})()},{path:"login",component:_}];let $=(()=>{class e{static#t=this.\u0275fac=function(r){return new(r||e)};static#e=this.\u0275mod=t.$C({type:e});static#n=this.\u0275inj=t.G2t({imports:[l.iI.forChild(j),l.iI]})}return e})();var R=i(219),w=i(8239);let I=(()=>{class e{static#t=this.\u0275fac=function(r){return new(r||e)};static#e=this.\u0275mod=t.$C({type:e});static#n=this.\u0275inj=t.G2t({imports:[c.MD,$,R.G,w.G]})}return e})()}}]);