import React, { useState } from "react";
import { Input, Radio } from "antd";

import { SEARCH_KEY } from "../constants";

const { Search } = Input;
//函数组件
//可以根据All/ Keyword/ User 搜索，搜索类型放到constants.js里面，分别对应0，1，2
function SearchBar(props) {
    const [searchType, setSearchType] = useState(SEARCH_KEY.all);
    const [error, setError] = useState("");

    const changeSearchType = (e) => {
        const searchType = e.target.value;
        setSearchType(searchType);
        //change search type要清空error
        setError("");
        if (searchType === SEARCH_KEY.all) {
          props.handleSearch({ type: searchType, keyword: "" });
        }
    };

    const handleSearch = (value) => {
        if (searchType !== SEARCH_KEY.all && value === "") {
            setError("Please input your search keyword!");
            return;
        }
        setError("");
        props.handleSearch({ type: searchType, keyword: value });
        //真正是通过Home去search，将searchType+content传给home，子到父，要回调函数
    };

    return (
        <div className="search-bar">
            <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
                //all的时候不需要search
                disabled={searchType === SEARCH_KEY.all}
            />
            <p className="error-msg">{error}</p>

            <Radio.Group
                onChange={changeSearchType}
                value={searchType}
                className="search-type-group"
            >
                <Radio value={SEARCH_KEY.all}>All</Radio>
                <Radio value={SEARCH_KEY.keyword}>Keyword</Radio>
                <Radio value={SEARCH_KEY.user}>User</Radio>
            </Radio.Group>
        </div>
    );
}

export default SearchBar;