import { useNavigate } from "react-router-dom"
import "../../css/user_page/user_page.css"
import home_svg from "../../imgs/logos/home.svg"
import search_svg from "../../imgs/logos/search.svg"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { search, searching ,switchFavorites} from "../../redux_store/user/userSlice"

function SideNav() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [show_search, set_search] = useState('none')
    const search_txt = useSelector((state)=>state.user.search)
    const is_searching = useSelector((state)=>state.user.searching)
    const switchfavorites = useSelector((state)=>state.user.showFavotites)

    useEffect(()=>{
        if(is_searching == false){
            set_search('none')
        }
    }, [is_searching])
    
    // const dd = useSelector((state)=>state.user)
    // console.log("dd:", dd);
        
    const [search_style, set_search_style] = useState('initial')
    function handleSearchBox(e) {
        
        navigate('/user_interface')
        if(!is_searching) {
            dispatch(switchFavorites(false))
            set_search('flex')
            set_search_style('aliceblue')
            dispatch(searching(true))
        }
        else {
            set_search('none')
            set_search_style('initial')
            dispatch(searching(false))

        }
    }
    function change_search(e) {
        dispatch(search(e.target.value.toLowerCase()))
    }
    let style = {
        display: show_search,
    }
    let search_style_obj = {
        backgroundColor: search_style,
    }
    return(
        <div className="sideNav">
            <div className="logo_search">
                <svg fill="#f0f8ff" width="64px" height="64px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><title>ionicons-v5_logos</title><path d="M468.41,269.19c-2.64-33.39-11.76-58-31.44-57.39a1,1,0,0,0-.92,1.37c5.11,12.59,9.68,36.9,9.17,58.07a1,1,0,0,1-2,.08c-2.19-21.21-7.1-41.19-16.22-59.43a186.69,186.69,0,0,0-348.91,41A4,4,0,0,1,74.76,256l-8.65,1.22c-17.2,2.4-26.9,34.9-21.7,72.5s23.5,66.2,40.7,63.8l13.24-1.85a4,4,0,0,1,3.93,1.84,186.71,186.71,0,0,0,339-56.07,4,4,0,0,1,3.68-3.08l4.4-.24C464.51,331.59,471.11,302.89,468.41,269.19ZM94.5,270.42a1,1,0,0,1,1.59-1.19c9.63,10,20.25,27.65,23.32,49.86,3.24,23.05-2.24,45.2-9.13,57.87a1,1,0,0,1-1.84-.73c4.07-14.44,5.16-33.83,2.27-54.74C107.91,301.17,102,283.22,94.5,270.42ZM273.27,380.21a15.53,15.53,0,0,1-15.41-13.83,15.48,15.48,0,1,1,15.41,13.83Zm81.84-4.72a15.37,15.37,0,1,1,14.6-16.2A15.43,15.43,0,0,1,355.11,375.49Z"></path><path d="M165.51,70h0a.31.31,0,0,1,.1.2h0c.1.2.2.3.3.5v.1a5.78,5.78,0,0,0,2.3,2.7c2,1.5,5,2.4,8.6,3a63.69,63.69,0,0,0,11.9.5,28.25,28.25,0,0,0,2.9-.2c-.4-.4-.8-.9-1.2-1.3h-1.3a52,52,0,0,1-11.6-.9,19.71,19.71,0,0,1-8.4-3.4,9.24,9.24,0,0,1-1.4-1.4,4.48,4.48,0,0,1,0-2.3c.5-2.3,2.4-4.8,5.5-7.4a57.25,57.25,0,0,1,10.9-7c.9-.4,1.7-.9,2.6-1.3.1-.1.3-.1.5-.2a24.69,24.69,0,0,0-.2,10.5c2.3,11.9,11.6,20.3,23.2,20.6l4,24.3,12.7-3-4-23.3c10.8-4.6,16.3-16.1,14-28a25.8,25.8,0,0,0-3.9-9.5c-5.3-.8-15.6-.8-29.2,2.1,1.1-.3,2.1-.7,3.2-1a135.27,135.27,0,0,1,21.5-4.2c.6-.1,1.2-.1,1.8-.2l3.5-.3h.6a61.83,61.83,0,0,1,10.8.3,29,29,0,0,1,6.1,1.4,5.71,5.71,0,0,0-.9,3.2,6.12,6.12,0,0,0,4.3,5.8h0a25.53,25.53,0,0,1-2.1,2.8,26,26,0,0,1-2.9,2.8c-1.1.9-2.3,1.8-3.5,2.7l-6.5,3.8-.3,1.5a.35.35,0,0,0,.2-.1l8.4-4.7c1.2-.8,2.4-1.6,3.4-2.4a29.15,29.15,0,0,0,3.2-2.8,29.86,29.86,0,0,0,2.4-2.8l.3-.6a6.14,6.14,0,0,0,5.4-6,6.06,6.06,0,0,0-6.1-6.1,6.81,6.81,0,0,0-2.8.7,24.6,24.6,0,0,0-8.2-2.7,63.48,63.48,0,0,0-15.5-.6,14.92,14.92,0,0,0-2.1.2,13.55,13.55,0,0,1-2,.2,25.15,25.15,0,0,0-18.7-3.7,25.86,25.86,0,0,0-17.8,13c-1.3.5-2.6,1.1-3.8,1.7-.7.3-1.3.6-2,.9a60.75,60.75,0,0,0-13.9,9.1c-3.1,2.9-4.9,5.7-5.3,8.3a6.14,6.14,0,0,0,.7,4A2.19,2.19,0,0,1,165.51,70Z"></path></g></svg>
                <button className="search_btn" style={search_style_obj} >
                    {/* <svg  width="64px" height="64px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="aliceblue" stroke-width="2"></path> <path d="M14 14L16 16" stroke="aliceblue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15 11.5C15 13.433 13.433 15 11.5 15C9.567 15 8 13.433 8 11.5C8 9.567 9.567 8 11.5 8C13.433 8 15 9.567 15 11.5Z" stroke="aliceblue" stroke-width="2"></path> </g></svg>   */}
                    <svg onClick={handleSearchBox} width="64px" height="64px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" stroke="#240940"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="aliceblue" stroke-width="2"></path> <path d="M14 14L16 16" stroke="aliceblue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15 11.5C15 13.433 13.433 15 11.5 15C9.567 15 8 13.433 8 11.5C8 9.567 9.567 8 11.5 8C13.433 8 15 9.567 15 11.5Z" stroke="aliceblue" stroke-width="2"></path> </g></svg>
                    <div className="search_box" style={style}>
                        <input type="search" value={search_txt} onChange={change_search} placeholder="search game..."/>
                    </div>
                </button>

            </div>
            <button className="favorite" onClick={()=>{dispatch(switchFavorites(!switchfavorites))}}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z" fill="currentColor" stroke="currentColor" stroke-width="2"></path> </g></svg>
            </button>
            <nav>
                <button className="active" onClick={()=>{navigate("/user_interface")}}>
                    <svg id="svg_home" width="32px" height="32px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5315 11.5857L20.75 10.9605V21.25H22C22.4142 21.25 22.75 21.5858 22.75 22C22.75 22.4143 22.4142 22.75 22 22.75H2.00003C1.58581 22.75 1.25003 22.4143 1.25003 22C1.25003 21.5858 1.58581 21.25 2.00003 21.25H3.25003V10.9605L2.46855 11.5857C2.1451 11.8445 1.67313 11.792 1.41438 11.4686C1.15562 11.1451 1.20806 10.6731 1.53151 10.4144L9.65742 3.91366C11.027 2.818 12.9731 2.818 14.3426 3.91366L22.4685 10.4144C22.792 10.6731 22.8444 11.1451 22.5857 11.4686C22.3269 11.792 21.855 11.8445 21.5315 11.5857ZM12 6.75004C10.4812 6.75004 9.25003 7.98126 9.25003 9.50004C9.25003 11.0188 10.4812 12.25 12 12.25C13.5188 12.25 14.75 11.0188 14.75 9.50004C14.75 7.98126 13.5188 6.75004 12 6.75004ZM13.7459 13.3116C13.2871 13.25 12.7143 13.25 12.0494 13.25H11.9507C11.2858 13.25 10.7129 13.25 10.2542 13.3116C9.76255 13.3777 9.29128 13.5268 8.90904 13.9091C8.52679 14.2913 8.37773 14.7626 8.31163 15.2542C8.24996 15.7129 8.24999 16.2858 8.25003 16.9507L8.25003 21.25H9.75003H14.25H15.75L15.75 16.9507L15.75 16.8271C15.7498 16.2146 15.7462 15.6843 15.6884 15.2542C15.6223 14.7626 15.4733 14.2913 15.091 13.9091C14.7088 13.5268 14.2375 13.3777 13.7459 13.3116Z" fill="currentColor"></path> <g opacity="0.5"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.75 9.5C10.75 8.80964 11.3096 8.25 12 8.25C12.6904 8.25 13.25 8.80964 13.25 9.5C13.25 10.1904 12.6904 10.75 12 10.75C11.3096 10.75 10.75 10.1904 10.75 9.5Z" fill="currentColor"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.75 9.5C10.75 8.80964 11.3096 8.25 12 8.25C12.6904 8.25 13.25 8.80964 13.25 9.5C13.25 10.1904 12.6904 10.75 12 10.75C11.3096 10.75 10.75 10.1904 10.75 9.5Z" fill="currentColor"></path> </g> <path opacity="0.5" d="M12.0494 13.25C12.7142 13.25 13.2871 13.2499 13.7458 13.3116C14.2375 13.3777 14.7087 13.5268 15.091 13.909C15.4732 14.2913 15.6223 14.7625 15.6884 15.2542C15.7462 15.6842 15.7498 16.2146 15.75 16.827L15.75 21.25H8.25L8.25 16.9506C8.24997 16.2858 8.24993 15.7129 8.31161 15.2542C8.37771 14.7625 8.52677 14.2913 8.90901 13.909C9.29126 13.5268 9.76252 13.3777 10.2542 13.3116C10.7129 13.2499 11.2858 13.25 11.9506 13.25H12.0494Z" fill="currentColor"></path> <path opacity="0.5" d="M16 3H18.5C18.7761 3 19 3.22386 19 3.5L19 7.63955L15.5 4.83955V3.5C15.5 3.22386 15.7239 3 16 3Z" fill="currentColor"></path> </g></svg>
                </button>
                <button onClick={()=>{navigate("category")}}>
                    <svg id="svg_message" width="32px" height="32px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M17.98 10.79V14.79C17.98 15.05 17.97 15.3 17.94 15.54C17.71 18.24 16.12 19.58 13.19 19.58H12.79C12.54 19.58 12.3 19.7 12.15 19.9L10.95 21.5C10.42 22.21 9.56 22.21 9.03 21.5L7.82999 19.9C7.69999 19.73 7.41 19.58 7.19 19.58H6.79001C3.60001 19.58 2 18.79 2 14.79V10.79C2 7.86001 3.35001 6.27001 6.04001 6.04001C6.28001 6.01001 6.53001 6 6.79001 6H13.19C16.38 6 17.98 7.60001 17.98 10.79Z" fill="currentColor"></path> <path d="M9.99023 14C9.43023 14 8.99023 13.55 8.99023 13C8.99023 12.45 9.44023 12 9.99023 12C10.5402 12 10.9902 12.45 10.9902 13C10.9902 13.55 10.5502 14 9.99023 14Z" fill="currentColor"></path> <path d="M13.4902 14C12.9302 14 12.4902 13.55 12.4902 13C12.4902 12.45 12.9402 12 13.4902 12C14.0402 12 14.4902 12.45 14.4902 13C14.4902 13.55 14.0402 14 13.4902 14Z" fill="currentColor"></path> <path d="M6.5 14C5.94 14 5.5 13.55 5.5 13C5.5 12.45 5.95 12 6.5 12C7.05 12 7.5 12.45 7.5 13C7.5 13.55 7.05 14 6.5 14Z" fill="currentColor"></path> <path d="M21.9791 6.79001V10.79C21.9791 13.73 20.6291 15.31 17.9391 15.54C17.9691 15.3 17.9791 15.05 17.9791 14.79V10.79C17.9791 7.60001 16.3791 6 13.1891 6H6.78906C6.52906 6 6.27906 6.01001 6.03906 6.04001C6.26906 3.35001 7.85906 2 10.7891 2H17.1891C20.3791 2 21.9791 3.60001 21.9791 6.79001Z" fill="currentColor"></path> </g></svg>
                </button>
                <button>
                    <svg id="svg_profile" width="32px" height="32px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z" fill="currentColor"></path> <path d="M17.0809 14.1499C14.2909 12.2899 9.74094 12.2899 6.93094 14.1499C5.66094 14.9999 4.96094 16.1499 4.96094 17.3799C4.96094 18.6099 5.66094 19.7499 6.92094 20.5899C8.32094 21.5299 10.1609 21.9999 12.0009 21.9999C13.8409 21.9999 15.6809 21.5299 17.0809 20.5899C18.3409 19.7399 19.0409 18.5999 19.0409 17.3599C19.0309 16.1299 18.3409 14.9899 17.0809 14.1499Z" fill="currentColor"></path> </g></svg>
                </button>
                <button>
                    <svg id="svg_" width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M14.2788 2.15224C13.9085 2 13.439 2 12.5 2C11.561 2 11.0915 2 10.7212 2.15224C10.2274 2.35523 9.83509 2.74458 9.63056 3.23463C9.53719 3.45834 9.50065 3.7185 9.48635 4.09799C9.46534 4.65568 9.17716 5.17189 8.69017 5.45093C8.20318 5.72996 7.60864 5.71954 7.11149 5.45876C6.77318 5.2813 6.52789 5.18262 6.28599 5.15102C5.75609 5.08178 5.22018 5.22429 4.79616 5.5472C4.47814 5.78938 4.24339 6.1929 3.7739 6.99993C3.30441 7.80697 3.06967 8.21048 3.01735 8.60491C2.94758 9.1308 3.09118 9.66266 3.41655 10.0835C3.56506 10.2756 3.77377 10.437 4.0977 10.639C4.57391 10.936 4.88032 11.4419 4.88029 12C4.88026 12.5581 4.57386 13.0639 4.0977 13.3608C3.77372 13.5629 3.56497 13.7244 3.41645 13.9165C3.09108 14.3373 2.94749 14.8691 3.01725 15.395C3.06957 15.7894 3.30432 16.193 3.7738 17C4.24329 17.807 4.47804 18.2106 4.79606 18.4527C5.22008 18.7756 5.75599 18.9181 6.28589 18.8489C6.52778 18.8173 6.77305 18.7186 7.11133 18.5412C7.60852 18.2804 8.2031 18.27 8.69012 18.549C9.17714 18.8281 9.46533 19.3443 9.48635 19.9021C9.50065 20.2815 9.53719 20.5417 9.63056 20.7654C9.83509 21.2554 10.2274 21.6448 10.7212 21.8478C11.0915 22 11.561 22 12.5 22C13.439 22 13.9085 22 14.2788 21.8478C14.7726 21.6448 15.1649 21.2554 15.3694 20.7654C15.4628 20.5417 15.4994 20.2815 15.5137 19.902C15.5347 19.3443 15.8228 18.8281 16.3098 18.549C16.7968 18.2699 17.3914 18.2804 17.8886 18.5412C18.2269 18.7186 18.4721 18.8172 18.714 18.8488C19.2439 18.9181 19.7798 18.7756 20.2038 18.4527C20.5219 18.2105 20.7566 17.807 21.2261 16.9999C21.6956 16.1929 21.9303 15.7894 21.9827 15.395C22.0524 14.8691 21.9088 14.3372 21.5835 13.9164C21.4349 13.7243 21.2262 13.5628 20.9022 13.3608C20.4261 13.0639 20.1197 12.558 20.1197 11.9999C20.1197 11.4418 20.4261 10.9361 20.9022 10.6392C21.2263 10.4371 21.435 10.2757 21.5836 10.0835C21.9089 9.66273 22.0525 9.13087 21.9828 8.60497C21.9304 8.21055 21.6957 7.80703 21.2262 7C20.7567 6.19297 20.522 5.78945 20.2039 5.54727C19.7799 5.22436 19.244 5.08185 18.7141 5.15109C18.4722 5.18269 18.2269 5.28136 17.8887 5.4588C17.3915 5.71959 16.7969 5.73002 16.3099 5.45096C15.8229 5.17191 15.5347 4.65566 15.5136 4.09794C15.4993 3.71848 15.4628 3.45833 15.3694 3.23463C15.1649 2.74458 14.7726 2.35523 14.2788 2.15224Z" fill="currentColor"></path> <path d="M15.5227 12C15.5227 13.6569 14.1694 15 12.4999 15C10.8304 15 9.47705 13.6569 9.47705 12C9.47705 10.3431 10.8304 9 12.4999 9C14.1694 9 15.5227 10.3431 15.5227 12Z" fill="currentColor"></path> </g></svg>
                </button>
            </nav>

        </div>
    )
}

export default SideNav