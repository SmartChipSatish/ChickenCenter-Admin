import{e as h,j as e,b as o}from"./index-CIyJEm74.js";import{F as l,k as x,l as j}from"./index-BjDVvrAq.js";import{T as m}from"./Table-C4-ClKNR.js";import{C as r}from"./Card-CTJQCgP1.js";import{f as p}from"./faPlus-DNNFQylq.js";import{u as N}from"./branchesEndPoint-D7oLM-pp.js";const y=()=>{const{data:s,isLoading:c,isError:i}=N(void 0),n=h(),t=()=>{n("create")};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"d-flex justify-content-between pageTitleSpace",children:[e.jsx("p",{className:"pageTile",children:"Franchises"}),e.jsxs(o,{variant:"outline-primary",onClick:()=>{t()},children:[e.jsx(l,{icon:p.faPlus})," Add"]})]}),e.jsx("div",{className:"BranchesPage",children:e.jsx(r,{className:"h-100",children:e.jsx(r.Body,{children:e.jsxs(m,{hover:!0,children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:e.jsx("p",{className:"tableTitle",children:"#"})}),e.jsx("th",{children:e.jsx("p",{className:"tableTitle",children:"Name"})}),e.jsx("th",{children:e.jsx("p",{className:"tableTitle",children:"Orders"})}),e.jsx("th",{children:e.jsx("p",{className:"tableTitle",children:"Address"})}),e.jsx("th",{children:e.jsx("p",{className:"tableTitle",children:"Actions"})})]})}),e.jsxs("tbody",{children:[i&&e.jsx("tr",{children:e.jsx("td",{colSpan:6,children:e.jsx("p",{children:"Something went wrong!"})})}),c&&e.jsx("tr",{children:e.jsx("td",{colSpan:6,children:e.jsx("p",{children:"Loading..."})})}),(s==null?void 0:s.length)===0&&e.jsx("tr",{children:e.jsx("td",{colSpan:6,children:e.jsx("p",{children:"No Data Found"})})}),s&&(s==null?void 0:s.map((a,d)=>e.jsxs("tr",{children:[e.jsx("td",{className:"tableItem",children:d+1}),e.jsx("td",{className:"tableItem",children:e.jsx("p",{className:"BranchesPage-id",children:a.name})}),e.jsx("td",{className:"tableItem",children:e.jsx("p",{className:"BranchesPage-id",children:(a==null?void 0:a.currentOrders)||0})}),e.jsx("td",{className:"tableItem",children:e.jsxs("p",{className:"BranchesPage-id",children:[a.address.name||"---"," ,",a.address.city]})}),e.jsxs("td",{children:[e.jsx(l,{icon:x,className:"BranchesPage-actions BranchesPage-eye"})," ",e.jsx(l,{icon:j,className:"BranchesPage-actions"})]})]})))]})]})})})})]})};export{y as default};
