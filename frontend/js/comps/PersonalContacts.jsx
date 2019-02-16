/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import AccordionWrap from "./AccordionWrap"

/**
 *  REST API Imports
 */
import BroadSoft from "../broadsoft/BroadSoft";;

/**
 * XML imports
 */
import { getTag, setTag } from "../broadsoft/xmlParse";
let xmljs = require('xml-js');

/**
 * Style imports
 */
import MaskedInput from 'react-text-mask';

export default class PersonalContacts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            unauthorized: false,
            status: "loading",
            data: [],
            newContactName: "",
            newContactNumber: ""
        };

        this.dataFormat = null;
    }

    componentDidMount() {
        this.loadAsync();
    }

// Asynchronous function that updates the object.
    loadAsync = () => {
        let self = this;
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/directories/Personal",
            success: function(response) {

                self.dataFormat = response;

                let contacts = [];
                // Loop through any entries that have been sent
                for(let entry in getTag(response, ["Personal"]).elements){
                    if(entry.name === "entry"){
                        contacts.add(entry);
                    }
                }
                if(contacts.length > 0) {
                    self.setState((prevState) => ({data: [...prevState.data, contacts]}));
                }
                self.setState({status: "ready"});
            },
            error: function(response) {
                // User does not have access to the endpoint.
                self.setState({unauthorized: true});
            }
        });
    }

    changePhone = (e, index) => {
        let newData = this.state.data;
        setTag(newData[index], ["entry", "number"], e.target.value);
        this.setState({data: newData})
    };

    changeName = (e, index) => {
        let newData = this.state.data;
        setTag(newData[index], ["entry", "name"], e.target.value);
        this.setState({data: newData})
    };

    deleteContact = (index) => {
        let currState = this.state.data;
        currState.splice(index, 1);
        this.setState({data: currState})
    };

    changeNewContactName = (e) => {
        this.setState({newContactName: e.target.value});
    };

    changeNewContactNumber = (e) => {
        this.setState({newContactNumber: e.target.value});
    };

    addContact = () => {
        // Contact Schema:
        let schema = "<entry><name>someName</name><number>+919900000000</number></entry>";
        let jsobj = xmljs.xml2js(schema);
        // Set schema properties
        let check1 = setTag(jsobj, ["entry", "name"], this.state.newContactName);
        let check2 = setTag(jsobj, ["entry", "number"], this.state.newContactNumber);

        let currentData = this.state.data;
        currentData.push(jsobj);
        this.setState({ data: currentData, newContactName: "", newContactNumber: ""});
    };

    makeTableRows = () => {
        let index = 0;
        let tableRows = [];
        for(let entry of this.state.data){
            let currentIndex = index;
            tableRows.push(
                <Table.Row id={"Contact" + currentIndex.toString()}>
                    <Table.Cell>
                        <Input value={getTag(entry, ["entry", "name"])} onChange={(e) => {this.changeName(e, currentIndex)}}/>
                    </Table.Cell>
                    <Table.Cell>
                        <Input value={getTag(entry, ["entry", "number"])} onChange={(e) => {this.changePhone(e, currentIndex)}}>
                            <MaskedInput
                                mask={['(',/\d/, /\d/, /\d/,')','-',/\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/]}
                                placeholder="(___)-___-____"
                                id={"Contact"+ currentIndex.toString() + "Number"}
                                guide = {true}
                                autoComplete="off"
                                defaultValue={getTag(entry, ["entry", "number"])} onChange={(e) => {this.changePhone(e, currentIndex)}}
                            />
                        </Input>
                    </Table.Cell>
                    <Table.Cell>
                        <Button onClick={() => {this.deleteContact(currentIndex)}}>Delete</Button>
                    </Table.Cell>
                </Table.Row>
            );
            index = index + 1;
        }
        return tableRows;
    };

    render() {
        if(this.state.status === "loading") {
            return (
                <AccordionWrap title={"Personal Contacts"}
                               description={"Create a list of personal contacts that can be stored for frequent use."}>
                    <div>
                        <div id={"PersonalContacts"}>Loading...</div>
                    </div>
                </AccordionWrap>
            )
        } else if(this.state.status === "ready") {
            return (
                <AccordionWrap title={"Personal Contacts"} description={"Create a list of personal contacts that can be stored for frequent use."}>
                    <div>
                        <Table striped id={"CallForwarding"}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>
                                        <div>Name</div>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <div>Number</div>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <div>Actions</div>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body key={"PersonalContactKey"}>
                                {this.makeTableRows()}
                                <Table.Row id={"AddContact"}>
                                    <Table.Cell>
                                        <Input value={this.state.newContactName} onChange={(e) => this.changeNewContactName(e)}/>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input value={this.state.newContactNumber} onChange={(e, index) => this.changeNewContactNumber(e)}>
                                            <MaskedInput
                                                mask={['(',/\d/, /\d/, /\d/,')','-',/\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/]}
                                                placeholder="(___)-___-____"
                                                id={"NewContactNumber"}
                                                guide = {true}
                                                autoComplete="off"
                                                value={this.state.newContactNumber} onChange={(e) => this.changeNewContactNumber(e)}
                                            />
                                        </Input>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button onClick={this.addContact}>Add</Button>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </div>
                </AccordionWrap>
            )
        }
    }
}