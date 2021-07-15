import React from "react";
import {Select} from "antd";
import Users from "../../APIS/Users.json";
import Grupos from "../../APIS/GruposTecnicos.json"

 export class SelectDropdownJson extends React.Component{

    render(){
        const { Option, OptGroup } = Select;

            return(

                <div>
                     <Select defaultValue="Grupos" style={{ width: 120 }}>

                        <OptGroup label="Grupos"> 
                            
                            {
                    Grupos.GruposTecnicos.map((result)=>(<Option title= {"Grupos ID" + result.group_id}>{result.name}</Option>))
                            }

                    </OptGroup>

                    </Select>

                    <Select defaultValue="Usuarios" style={{ width: 120 }}>
                        
                        <OptGroup label="usuarios">
                                {
                        Users.usersNames.map((result)=>(<Option  title= { "Usuario ID" + result.id}>{result.name}</Option>))
                                }

                        </OptGroup>
                        </Select>
                            
                </div>
            )
    }
    }

    export default SelectDropdownJson;