import React from 'react'; 
import { useDispatch, useSelector, useStore } from 'react-redux'; 
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseURL, chooseToken } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { display } from '@mui/system';

interface CarbonFormProps{
    id?: string;
    data?: {};
}

interface CarbonState{
    website_url: string
}

export const CarbonForm = (props:CarbonFormProps) => {
    const dispatch = useDispatch();
    let {carbonData, getData} = useGetData();
    const store = useStore();

    // const websiteURL = useSelector<CarbonState>(state => state.website_url)
    // const lastName = useSelector<CarbonState>(state => state.last_name)

    const { register, handleSubmit } = useForm({})

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if(props.id!){
            const website = `https://www.${data.website_url}.com`
            console.log(website)
            let carbonObject: any = {
                'website_url' : website
            }
           
            let token = '12345test'
            await serverCalls.update(token, props.id!, carbonObject)
            console.log(`Updated: ${website} \n ID: ${props.id}`)
            await window.location.reload();
            await event.target.reset()
            

        } else{
       
            const website = `https://www.${data.website_url}`
            const token = localStorage.getItem('token')
            console.log(website)
            console.log(token)

            await dispatch(chooseURL(website))
            await dispatch(chooseToken(token))
            await serverCalls.create(store.getState());
            await window.location.reload();
            await event.target.reset();
        
        }
    }
    
    return(
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="website_url"> Website URL</label>
                    <Input {...register('website_url')} name='website_url' placeholder='instagram.com' />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}