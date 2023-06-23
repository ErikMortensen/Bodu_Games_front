import React from 'react'
import style from './Pagination.module.css'
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'

const Pagination = (props) => {
    const {setCurrentPage, totalPosts, postPerPage, currentPage} = props

    let pages = []
    for(let i = 1; i <= Math.ceil(totalPosts/postPerPage) ; i++){
        pages.push(i)
    }

    

  return (
    <div className={style.pagination}>
            <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled = {currentPage === 1 ? true : false}
                className={currentPage === 1 ? style.disabled : style.active}
            ><ChevronLeftIcon/>
            </button>
        {
            pages.map((page, index) =>{
                return <button
                            key={index} 
                            onClick={() => setCurrentPage(page)}
                        >{page}</button>
            })
        }
            <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled = {currentPage === 3 ? true : false}
                className={currentPage === 3 ? style.disabled : style.active}
            ><ChevronRightIcon/></button>
    </div>
  )
}

export default Pagination