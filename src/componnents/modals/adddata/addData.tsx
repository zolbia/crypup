import * as React from "react";
import {
    Button, Checkbox, Chip,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    InputBase,
    Modal,
    Paper,
    Stack,
    TextField
} from "@mui/material";
import {SendRounded} from "@mui/icons-material";
import {useState} from "react";
import {addFeed} from "../../../DB/database";


type propsModel = {
    isOpen: boolean,
    close?: any
}

type sendDataModel = {
    URL: string,
    Name: string,
    IsActive: boolean,
    Tags?: [] | any,
    RSSs?: [] | any
}


export default function AddFeedsModal(props: propsModel) {

    //states
    const [active, setActive] = useState(true);
    const [Rss, setRss] = useState<Array<any>>([]);
    const [Tags, setTags] = useState<Array<any>>([]);
    const [valueRss, setValueRss] = useState<string>('');
    const [valueTag, setValueTag] = useState('');
    const [URL, setURL] = useState('');
    const [name, setName] = useState('');


    //models
    enum chipType {
        RSS, Tag
    }

    const customChipRss = (label: string, type: chipType) => {
        return (
            <Chip
                size={'small'}
                style={{
                    margin: '3px',
                    background: 'gainsboro',
                    borderRadius: '20px'
                }}
                key={Math.random()}
                hidden={false}
                label={label}
                onDelete={() => {
                    switch (type) {
                        case chipType.RSS:
                            for (const rssKey in Rss) {
                                if (Rss[parseInt(rssKey)].props.label === label) {
                                    Rss.splice(parseInt(rssKey), 1)
                                }
                            }
                            setRss([...Rss]);
                            break;
                        case  chipType.Tag:
                            for (const tagKey in Tags) {
                                if (Tags[parseInt(tagKey)].props.label === label) {
                                    Tags.splice(parseInt(tagKey), 1)
                                }
                            }
                            setTags([...Tags]);
                            break;
                    }

                }}
            />
        )
    };


    //functions
    const addRSS = () => {
        Rss.push(customChipRss(valueRss, chipType.RSS));
        setRss(Rss);
        setValueRss('');
    }
    const addTag = () => {
        Tags.push(customChipRss(valueTag, chipType.Tag));
        setTags(Tags);
        setValueTag('');
    }

    const sendFeed = () => {

        //constructor  data
        const sendData: sendDataModel = {
            Tags: Tags.map(tg => tg.props.label),
            RSSs: Rss.map(rs => rs.props.label),
            IsActive: active,
            URL: URL,
            Name: name
        };

        //clear modal
        setTags([]);
        setRss([]);
        setURL('');
        setName('');
        setActive(true);

        addFeed(sendData).then(result => {
            console.log(result);
        });


    }


    return (
        <Modal onBackdropClick={props.close}
               open={props.isOpen}
        >
            <FormGroup style={{
                position: 'absolute',
                justifyItems: 'center',
                justifyContent: 'right',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500,
                height: 700,
                background: 'white',
                borderRadius: "10px",
            }}>

                <h3 style={{
                    width: '90%',
                    margin: '5%'
                }}> Add Feeder </h3>

                <Divider/>

                <TextField value={URL} onChange={(e) => {
                    setURL(e.target.value)
                }} type={'url'} label={"URL"}
                           style={{
                               height: "10px",
                               width: '90%',
                               margin: '5%'
                           }}/>

                <TextField label={"Name"}
                           value={name}
                           onChange={(e) => {
                               setName(e.target.value)
                           }}
                           style={{
                               width: '90%',
                               margin: '5%'
                           }}/>

                <Grid style={{
                    width: '90%',
                    margin: '5%',
                }}>

                    <Stack alignItems="left" flexWrap={'wrap'}
                           justifyContent={'space-evenly'}
                           style={{height: 'auto'}}
                           direction={"row"}>
                        {Rss}
                    </Stack>
                    <Paper
                        component="form"
                        sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%"}}
                    >

                        <InputBase
                            sx={{ml: 1, flex: 1}}
                            placeholder="Add RSS"
                            value={valueRss}
                            onChange={(text) => {
                                setValueRss(text.target.value);
                            }}
                        />

                        <IconButton
                            onClick={valueRss.length > 0 ? addRSS : undefined}
                            type="button" sx={{p: '10px'}}>
                            <SendRounded/>
                        </IconButton>
                    </Paper>

                </Grid>


                <Grid style={{
                    width: '90%',
                    margin: '5%',
                }}>

                    <Stack alignItems="left" flexWrap={'wrap'}
                           justifyContent={'space-evenly'}
                           style={{height: 'auto'}}
                           direction={"row"}>
                        {Tags}
                    </Stack>
                    <Paper
                        component="form"
                        sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%"}}
                    >

                        <InputBase
                            sx={{ml: 1, flex: 1}}
                            placeholder="Add Tags"
                            onChange={(text) => {
                                setValueTag(text.target.value);
                            }}
                        />

                        <IconButton
                            onClick={valueTag.length > 0 ? addTag : undefined}
                            type="button" sx={{p: '10px'}}>
                            <SendRounded/>
                        </IconButton>
                    </Paper>

                </Grid>


                <FormControlLabel defaultChecked checked={active} onChange={() => {
                    setActive(!active)
                }} style={{
                    width: '90%',
                    margin: '5%'
                }} control={<Checkbox defaultChecked/>} label="Active"/>

                <Stack style={{height: 50, justifyContent: 'center'}} direction={'row'}>

                    <Button onClick={sendFeed} style={{
                        color: 'white',
                        borderRadius: '10px',
                        background: '#1976d2',
                        height: "auto",
                        width: '60%',
                        padding: 10
                    }}>
                        add Feed
                    </Button>
                    <Button variant={'text'} onClick={
                        props.close

                    } style={{
                        borderRadius: '10px',
                        height: "auto",
                        width: '30%',
                        padding: 10
                    }}>
                        Cancel
                    </Button>
                </Stack>


            </FormGroup>

        </Modal>

    );
}