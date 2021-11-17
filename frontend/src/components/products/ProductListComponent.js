import React, {useState} from 'react'
import {Box, FormControl, InputLabel, Select, MenuItem, Container, Typography} from '@mui/material'
 
const ProductListComponent = ({ home = false, }) => {
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');

    return (
        <Container>
            <Box className="product-filters" sx={{ display: 'flex', marginTop: home ? '3rem' : '', justifyContent: 'space-between'}}>
                <div className="left-section">
                    <div style={{display: 'flex', alignItems: 'center', marginRight: '1rem'}}>
                        <Typography variant="h5" sx={{fontSize: '1.5rem'}}>Filter Products:</Typography>
                    </div>
                    <Box sx={{ minWidth: 120, mr:3 }}>
                        <FormControl fullWidth>
                            <InputLabel id="size">Size</InputLabel>
                            <Select
                                labelId="size"
                                id="size-select"
                                value={size}
                                label="Size"
                                onChange={(e) => {setSize(e.target.value)}}
                            >
                                <MenuItem value={"S"}>Small</MenuItem>
                                <MenuItem value={"M"}>Medium</MenuItem>
                                <MenuItem value={"L"}>Large</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="size">Color</InputLabel>
                            <Select
                                labelId="color"
                                id="size-color"
                                value={color}
                                label="color"
                                onChange={(e) => {setColor(e.target.value)}}
                            >
                                <MenuItem value={"black"}>Black</MenuItem>
                                <MenuItem value={"yellow"}>Yellow</MenuItem>
                                <MenuItem value={"orange"}>Orange</MenuItem>
                                <MenuItem value={"blue"}>Blue</MenuItem>
                                <MenuItem value={"khaki"}>Khaki</MenuItem>
                                <MenuItem value={"beige"}>Beige</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div className="right-section">
                    <div style={{display: 'flex', alignItems: 'center', marginRight: '1rem'}}>
                        <Typography variant="h5" sx={{fontSize: '1.5rem'}}>Sort Products:</Typography>
                    </div>
                    <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="size">Size</InputLabel>
                                <Select
                                    labelId="size"
                                    id="size-select"
                                    value={size}
                                    label="Size"
                                    onChange={(e) => {setSize(e.target.value)}}
                                >
                                    <MenuItem value={"S"}>Small</MenuItem>
                                    <MenuItem value={"M"}>Medium</MenuItem>
                                    <MenuItem value={"L"}>Large</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </Box>
        </Container>
    )
}

export default ProductListComponent
