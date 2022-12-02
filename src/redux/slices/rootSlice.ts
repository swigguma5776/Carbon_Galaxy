import { createSlice } from '@reduxjs/toolkit';


const rootSlice = createSlice({
    name: "root",
    initialState: {
        website_url: 'instagram.com',
        token: '12345test'
     
    },
    reducers: {
        chooseURL: (state, action) => { state.website_url = action.payload},
        chooseToken: (state, action) => { state.token = action.payload}
       

    }
})

// Exporting those Reducers (so much typing :())
export const reducer = rootSlice.reducer;
export const { chooseURL, chooseToken } = rootSlice.actions