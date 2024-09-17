"use strict";(self.webpackChunkClient=self.webpackChunkClient||[]).push([[123],{8123:(S,d,c)=>{c.r(d),c.d(d,{InvoiceModule:()=>E});var r=c(177),s=c(8498);class l{constructor(){this.sort="customerName",this.pageNumber=1,this.pageSize=6,this.search=""}}var t=c(4438),v=c(1626),u=c(5312);let h=(()=>{class e{constructor(n){this.http=n,this.baseUrl=u.c.apiUrl,this.invoiceParams=new l}getInvoices(n){let o=new v.Nl;return o=o.append("sort",n.sort),o=o.append("pageIndex",n.pageNumber),o=o.append("pageSize",n.pageSize),n.search&&(o=o.append("search",n.search)),this.http.get(this.baseUrl+"invoices",{params:o})}setInvoiceParams(n){this.invoiceParams=n}getInvoiceParams(){return this.invoiceParams}getInvoice(n){return this.http.get(`${this.baseUrl}invoices/${n}`)}getCustomers(){return this.http.get(`${this.baseUrl}customers`)}getReservations(){return this.http.get(`${this.baseUrl}reservations`)}getCustomerById(n){return this.http.get(`${this.baseUrl}customers/${n}`)}getReservationById(n){return this.http.get(`${this.baseUrl}reservations/${n}`)}static#t=this.\u0275fac=function(o){return new(o||e)(t.KVO(v.Qq))};static#n=this.\u0275prov=t.jDH({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var C=c(6672),f=c(7156),b=c(8788),m=c(9417);function P(e,p){if(1&e&&(t.j41(0,"tr",3)(1,"td"),t.EFF(2),t.nI1(3,"date"),t.k0s(),t.j41(4,"td"),t.EFF(5),t.k0s(),t.j41(6,"td"),t.EFF(7),t.k0s(),t.j41(8,"td"),t.EFF(9),t.k0s(),t.j41(10,"td"),t.EFF(11),t.nI1(12,"currency"),t.k0s()()),2&e){const n=t.XpG().$implicit;t.Mz_("routerLink","/invoices/",n.id,""),t.R7$(2),t.JRh(t.bMT(3,7,n.date)),t.R7$(3),t.JRh(n.reservation),t.R7$(2),t.JRh(n.customer),t.R7$(2),t.JRh(n.paymentType),t.R7$(2),t.JRh(t.bMT(12,9,n.totalAmount))}}function M(e,p){if(1&e&&(t.j41(0,"tbody"),t.DNE(1,P,13,11,"tr",2),t.k0s()),2&e){const n=p.$implicit;t.R7$(),t.Y8G("ngIf",n)}}let O=(()=>{class e{static#t=this.\u0275fac=function(o){return new(o||e)};static#n=this.\u0275cmp=t.VBU({type:e,selectors:[["app-invoice-item"]],inputs:{invoices:"invoices"},decls:14,vars:1,consts:[[1,"table","table-hover"],[4,"ngFor","ngForOf"],[3,"routerLink",4,"ngIf"],[3,"routerLink"]],template:function(o,i){1&o&&(t.j41(0,"table",0)(1,"thead")(2,"tr")(3,"th"),t.EFF(4,"Date"),t.k0s(),t.j41(5,"th"),t.EFF(6,"Reservation N."),t.k0s(),t.j41(7,"th"),t.EFF(8,"Customer Name"),t.k0s(),t.j41(9,"th"),t.EFF(10,"Payment Type"),t.k0s(),t.j41(11,"th"),t.EFF(12,"Total Costs"),t.k0s()()(),t.DNE(13,M,2,1,"tbody",1),t.k0s()),2&o&&(t.R7$(13),t.Y8G("ngForOf",i.invoices))},dependencies:[r.Sq,r.bT,s.Wk,r.oe,r.vh],styles:["table[_ngcontent-%COMP%]{border-collapse:separate;border-spacing:0px;min-width:max-content}table.table-hover[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{position:sticky;font-weight:500}table.table-hover[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{background-color:#f3f3f3;cursor:pointer}table.table-hover[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:60px}table.table-hover[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-weight:400}table.table-hover[_ngcontent-%COMP%]   td.available[_ngcontent-%COMP%]{color:green}table.table-hover[_ngcontent-%COMP%]   td.rented[_ngcontent-%COMP%]{color:red}table.table-hover[_ngcontent-%COMP%]   td.reserved[_ngcontent-%COMP%]{color:gold}table.table-hover[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:#fff;border:1px solid rgba(84,84,84,.5);border-radius:8px;font-weight:400}table.table-hover[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#e5e5e5}"]})}return e})();const _=["search"];function x(e,p){if(1&e&&(t.j41(0,"option",17),t.EFF(1),t.k0s()),2&e){const n=p.$implicit;t.Y8G("value",n.value),t.R7$(),t.SpI(" ",n.name," ")}}function y(e,p){if(1&e){const n=t.RV6();t.j41(0,"div",18)(1,"app-pager",19),t.bIt("pageChanged",function(i){t.eBV(n);const a=t.XpG();return t.Njj(a.onPageChanged(i))}),t.k0s()()}if(2&e){const n=t.XpG();t.R7$(),t.Y8G("totalCount",n.totalCount)("pageSize",n.invoiceParams.pageSize)}}let I=(()=>{class e{constructor(n,o){this.invoiceService=n,this.accountService=o,this.invoiceParams=new l,this.sortOption=[{name:"Customer Name",value:"customerName"},{name:"Date: Asc To Desc",value:"dateAsc"},{name:"Date: Desc To Asc",value:"dateDesc"}],this.totalCount=0}ngOnInit(){this.currentUser$=this.accountService.currentUser$,this.isAdmin$=this.accountService.isAdmin$,this.getInvoices()}getInvoices(){this.invoiceService.getInvoices(this.invoiceParams).subscribe({next:n=>{this.invoices=n.data,this.invoiceParams.pageNumber=n.pageIndex,this.invoiceParams.pageSize=n.pageSize,this.totalCount=n.count},error:n=>console.log(n)})}onSortSelected(n){this.invoiceParams.sort=n.target.value,this.getInvoices()}onPageChanged(n){this.invoiceParams.pageNumber!==n&&(this.invoiceParams.pageNumber=n,this.getInvoices())}onSearch(){this.invoiceParams.search=this.searchTerm?.nativeElement.value,this.invoiceParams.pageNumber=1,this.getInvoices()}onReset(){this.searchTerm&&(this.searchTerm.nativeElement.value=""),this.invoiceParams=new l,this.getInvoices()}static#t=this.\u0275fac=function(o){return new(o||e)(t.rXU(h),t.rXU(C.D))};static#n=this.\u0275cmp=t.VBU({type:e,selectors:[["app-invoice"]],viewQuery:function(o,i){if(1&o&&t.GBs(_,5),2&o){let a;t.mGM(a=t.lsd())&&(i.searchTerm=a.first)}},decls:20,vars:6,consts:[["search",""],[1,"content"],[1,"content-cover"],[1,"title"],[1,"search"],["type","text","placeholder","Search",3,"keyup.enter"],[1,"box-filter"],[1,"select"],[1,"",3,"change"],[3,"value",4,"ngFor","ngForOf"],[1,"actions"],["routerLink","/admin-invoice",1,"new-vehicle"],[1,"table-wrapper"],[3,"invoices"],[1,"d-flex","justify-content-between","align-item-center","mt-4"],[3,"totalCount","pageNumber","pageSize"],["class","",4,"ngIf"],[3,"value"],[1,""],[3,"pageChanged","totalCount","pageSize"]],template:function(o,i){if(1&o){const a=t.RV6();t.j41(0,"section",1)(1,"div",2)(2,"div",3)(3,"h1"),t.EFF(4,"Invoices"),t.k0s(),t.j41(5,"div",4)(6,"input",5,0),t.bIt("keyup.enter",function(){return t.eBV(a),t.Njj(i.onSearch())}),t.k0s()()(),t.j41(8,"div",6)(9,"div",7)(10,"select",8),t.bIt("change",function(N){return t.eBV(a),t.Njj(i.onSortSelected(N))}),t.DNE(11,x,2,2,"option",9),t.k0s()(),t.j41(12,"div",10)(13,"button",11),t.EFF(14,"Admin Invoice"),t.k0s()()(),t.j41(15,"div",12),t.nrm(16,"app-invoice-item",13),t.k0s(),t.j41(17,"div",14),t.nrm(18,"app-paging-header",15),t.DNE(19,y,2,2,"div",16),t.k0s()()()}2&o&&(t.R7$(11),t.Y8G("ngForOf",i.sortOption),t.R7$(5),t.Y8G("invoices",i.invoices),t.R7$(2),t.Y8G("totalCount",i.totalCount)("pageNumber",i.invoiceParams.pageNumber)("pageSize",i.invoiceParams.pageSize),t.R7$(),t.Y8G("ngIf",i.totalCount>0))},dependencies:[r.Sq,r.bT,s.Wk,f.B,b.x,m.xH,m.y7,O],styles:[".content[_ngcontent-%COMP%]{background-color:#f3f3f3;padding:20px;border-radius:10px}.content[_ngcontent-%COMP%]   .content-cover[_ngcontent-%COMP%]{background-color:#fff;padding:20px;border-radius:8px;box-shadow:0 0 10px #0000001a;margin-bottom:20px}.content[_ngcontent-%COMP%]   .table-wrapper[_ngcontent-%COMP%]{overflow-X:scroll}.content[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.content[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:30px}.content[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%]{display:flex;gap:10px}@media (max-width: 690px){.content[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%]{display:flex}}.content[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border-radius:5px;border:1px solid rgba(0,0,0,.28);padding:3px 10px}.content[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:none;color:#fff;border-radius:5px;background-color:#49aeee;padding:3px 20px}.content[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#3f92c6}.content[_ngcontent-%COMP%]   .box-filter[_ngcontent-%COMP%]{margin-top:35px;margin-bottom:15px;display:flex;align-items:center;justify-content:space-between;columns:2}@media (max-width: 600px){.content[_ngcontent-%COMP%]   .box-filter[_ngcontent-%COMP%]{display:flex;flex-direction:column;columns:1}}.content[_ngcontent-%COMP%]   .box-filter[_ngcontent-%COMP%]   .select[_ngcontent-%COMP%]{display:flex;align-items:center;gap:15px}.content[_ngcontent-%COMP%]   .box-filter[_ngcontent-%COMP%]   .select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{padding:5px 10px;border:1px solid #ccc;border-radius:5px;background-color:#fff;appearance:none;width:200px;cursor:pointer}@media (max-width: 600px){.content[_ngcontent-%COMP%]   .box-filter[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]{margin-top:20px}}.content[_ngcontent-%COMP%]   .box-filter[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-weight:400;border:none;border-radius:5px;padding:5px 12px;margin-left:10px}.content[_ngcontent-%COMP%]   .box-filter[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button.filter[_ngcontent-%COMP%]{color:#000;border:1px solid #011;background-color:#fff}.content[_ngcontent-%COMP%]   .box-filter[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button.filter[_ngcontent-%COMP%]:hover{color:#fff;background-color:#2f7f81;border:none}.content[_ngcontent-%COMP%]   .box-filter[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button.new-vehicle[_ngcontent-%COMP%]{color:#fff;background-color:#2f7f81}.content[_ngcontent-%COMP%]   .box-filter[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button.new-vehicle[_ngcontent-%COMP%]:hover{background-color:#fff;color:#000;border:1px solid #011}"]})}return e})();var g=c(5596),F=c(1997);function k(e,p){if(1&e){const n=t.RV6();t.j41(0,"div")(1,"mat-card",4)(2,"mat-card-header")(3,"mat-card-title"),t.EFF(4,"Invoice"),t.k0s()(),t.j41(5,"mat-card-content")(6,"h2"),t.EFF(7,"Invoice Information"),t.k0s(),t.j41(8,"div")(9,"div",5)(10,"div",6)(11,"p"),t.EFF(12,"Date"),t.k0s(),t.j41(13,"p"),t.EFF(14,"Customer Name"),t.k0s(),t.j41(15,"p"),t.EFF(16,"Reservation Number"),t.k0s(),t.j41(17,"p"),t.EFF(18,"Payment Type"),t.k0s()(),t.j41(19,"div",7)(20,"p"),t.EFF(21),t.nI1(22,"date"),t.k0s(),t.j41(23,"p"),t.EFF(24),t.k0s(),t.j41(25,"p"),t.EFF(26),t.k0s(),t.j41(27,"p"),t.EFF(28),t.k0s()()(),t.nrm(29,"mat-divider"),t.j41(30,"div",8)(31,"p"),t.EFF(32,"Total"),t.k0s(),t.j41(33,"p"),t.EFF(34),t.nI1(35,"currency"),t.k0s()()()(),t.j41(36,"mat-card-actions")(37,"button",9),t.bIt("click",function(){t.eBV(n);const i=t.XpG();return t.Njj(i.printInvoice())}),t.EFF(38,"Print Invoice"),t.k0s()()()()}if(2&e){const n=t.XpG();t.R7$(21),t.JRh(t.bMT(22,5,n.invoice.date)),t.R7$(3),t.JRh(n.invoice.customer),t.R7$(2),t.JRh(n.invoice.reservation),t.R7$(2),t.JRh(n.invoice.paymentType),t.R7$(6),t.JRh(t.bMT(35,7,n.invoice.totalAmount))}}const j=[{path:"",component:I},{path:":id",component:(()=>{class e{constructor(n,o){this.invoiceService=n,this.activateRoute=o}ngOnInit(){this.getInvoice()}getInvoice(){const n=this.activateRoute.snapshot.paramMap.get("id");n&&this.invoiceService.getInvoice(+n).subscribe({next:o=>this.invoice=o,error:o=>console.log(o)})}printInvoice(){const n=window.open("","_blank");n&&(n.document.write(`\n        <html>\n          <head>\n            <title>Invoice</title>\n            <style>\n              body {\n                font-family: 'montserrat', sans-serif;                \n                margin: 20px;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n              }\n              h2 {\n                border-bottom: 1px solid #333;\n                padding-bottom: 5px;\n              }\n              p {\n                margin: 20px 0;\n                font-size: 18px\n              }\n              strong {\n                font-size: 18px\n              }\n              .content {\n                width: 360px;\n                padding: 50px;\n                border: 1px solid #ddd;\n                border-radius: 4px;\n                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n                background-color: #fff;\n                margin: 20px;\n              }\n              .body {\n                display: flex;\n                justify-content: space-between;\n\n              }\n              .total {\n                display: flex;\n                justify-content: space-between;\n              }\n            </style>\n          </head>\n          <body>\n            <div class="content">\n              <h2>Invoice Details</h2>\n              <div class="body">\n                <div class="info">\n                  <p><strong>Date:</strong></p>\n                  <p><strong>Reservation N.:</strong></p>\n                  <p><strong>Customer Name:</strong></p>\n                  <p><strong>Payment Type:</strong></p>\n                </div>\n                <div class="data">\n                  <p> ${this.invoice.date}</p>\n                  <p> ${this.invoice.reservation}</p>\n                  <p> ${this.invoice.customer}</p>\n                  <p> ${this.invoice.paymentType}</p>\n                </div>\n              </div>\n              <hr/>\n              <div class="total">\n                <p><strong>Total Costs:</strong></p>\n                <p>$${this.invoice.totalAmount}</p>\n              </div>\n            </div>\n          </body>\n        </html>\n      `),n.document.close(),n.print())}static#t=this.\u0275fac=function(o){return new(o||e)(t.rXU(h),t.rXU(s.nX))};static#n=this.\u0275cmp=t.VBU({type:e,selectors:[["app-invoice-details"]],decls:4,vars:1,consts:[[1,"back"],["routerLink","/invoices",1,"bi","bi-arrow-left"],[1,"container"],[4,"ngIf"],[1,"card"],[1,"body"],[1,"info"],[1,"data"],[1,"total"],[1,"print-button",3,"click"]],template:function(o,i){1&o&&(t.j41(0,"div",0),t.nrm(1,"i",1),t.k0s(),t.j41(2,"div",2),t.DNE(3,k,39,9,"div",3),t.k0s()),2&o&&(t.R7$(3),t.Y8G("ngIf",i.invoice))},dependencies:[r.bT,s.Wk,g.RN,g.YY,g.m2,g.MM,g.dh,F.q,r.oe,r.vh],styles:[".back[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:35px;color:#303d50;cursor:pointer;transition:.5s}.back[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:hover{color:#6985af;padding:5px}.container[_ngcontent-%COMP%]{display:flex;justify-content:center}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{padding:20px}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]{margin-top:20px;display:flex;gap:70px}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:18px;color:#505050}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]{margin-right:15px}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]{margin:30px}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:25px;font-weight:400;color:#505050}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:20px;font-weight:500}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .total[_ngcontent-%COMP%]{margin-top:20px;display:flex;justify-content:space-between}.container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:none;color:#fff;background-color:#4a5361;border-radius:8px;padding:5px 8px;transition:.2s}.container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{padding:6px 9px}"]})}return e})()}];let R=(()=>{class e{static#t=this.\u0275fac=function(o){return new(o||e)};static#n=this.\u0275mod=t.$C({type:e});static#e=this.\u0275inj=t.G2t({imports:[s.iI.forChild(j),s.iI]})}return e})();var $=c(219),T=c(8239);let E=(()=>{class e{static#t=this.\u0275fac=function(o){return new(o||e)};static#n=this.\u0275mod=t.$C({type:e});static#e=this.\u0275inj=t.G2t({imports:[r.MD,R,$.G,T.G]})}return e})()}}]);