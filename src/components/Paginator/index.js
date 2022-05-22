import React from "react";
import './Pagination.css';

const MAX_ITENS = 9;
const MAX_LEFT = (MAX_ITENS - 1) / 2;


const Pagination = ({ limit, totalItens, offSet }) => {
    const current = offSet ? (offSet / limit) + 1 : 1;
    const pages = Math.ceil(totalItens / limit);
    const firstPage = Math.max(current - MAX_LEFT, 1);

    return (
        <div className="listPagination">
            <ul>
                {Array.from({ length: MAX_ITENS })
                    .map((_, index) => index + firstPage)}
            </ul>
        </div>

    )
}


export default Pagination;