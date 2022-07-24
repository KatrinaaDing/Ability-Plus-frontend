/**
 * Author: Ziqi Ding
 * Created At: 14 Jul 2022
 * Discription: A page that shows all companies
 */
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import React from 'react';
import { Stack, Card, CardActionArea, Grid, Paper, CardContent} from '@mui/material';
import { BASE_URL } from 'api/axios';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom'
import useAuth from 'auth/useAuth';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const CompanyList = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [allCompanies, setAllCompanies] = useState([{'id': 0, 'fullName':'name'}]);
    useEffect(() => {
        const getAllCompanies = async () => {
            try {
                const response = await fetch(`${BASE_URL}/user/list_company`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        token: auth.accessToken
                    },
                });
                if (response.status === 200) {
                    const data = await response.json()
                    console.log(data)
                    setAllCompanies(data.data)
                }
            } catch (e) {
                console.log(e)
            }
        }
    getAllCompanies();
    }, [])
    return (
        <BasicPageLayout title="View All Companies">
            <Stack spacing={2} sx={{ width: '70vw', ml: '10%', mr: '10%' }}>
                {allCompanies.map((c,idx) =>
                    <Card key={idx}>
                            <CardActionArea onClick={() =>  window.open(`/company-info/${c.id}`) }>
                                <CardContent sx={{ maxHeight: 75 }}>
                                    <Grid 
                                        container 
                                        item xs={12} 
                                        justifyContent="center" 
                                        mx="auto" 
                                        
                                >
                                    <Link to={ `/company-info/${c.id}`} target="_blank">{c.fullName}</Link>
                                    </Grid>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                )}
            </Stack>
        </BasicPageLayout>
    );
};

export default CompanyList;