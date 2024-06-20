interface IPageTitle {
    name: string,
    pageItems?: number
    classNames?:any
}
export const PageTitle = ({ name, pageItems = 0 , classNames}: IPageTitle) => {
    return <>
        <p className={`pageTile ${classNames}`} >{name} {pageItems > 0 && <span className="pageItemsCount">({pageItems})</span>}</p>
    </>

}