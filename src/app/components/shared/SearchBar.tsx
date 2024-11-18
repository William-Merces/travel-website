'use client'
import React from 'react';
import { Paper, InputBase, IconButton, Box } from '@mui/material';
import { Search, MapPin } from 'lucide-react';

export const SearchBar = ({ onSearch }) => {
    return (
        <Paper className="p-2 flex items-center w-full max-w-2xl mx-auto">
            <IconButton>
                <MapPin className="h-5 w-5" />
            </IconButton>
            <InputBase
                className="ml-1 flex-1"
                placeholder="Para onde você quer ir?"
                inputProps={{ 'aria-label': 'search destination' }}
            />
            <IconButton onClick={onSearch}>
                <Search className="h-5 w-5" />
            </IconButton>
        </Paper>
    );
};