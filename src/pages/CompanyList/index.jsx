/**
 * Author: Ziqi Ding
 * Created At: 14 Jul 2022
 * Discription: A page that shows all companies
 */
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import React from 'react';
import { Stack, Card, CardActionArea, Grid, Paper, CardContent, List, ListItem, ListItemAvatar, Avatar, ListItemText} from '@mui/material';
import { BASE_URL } from 'api/axios';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom'
import useAuth from 'auth/useAuth';
import MKBox from 'components/MKBox';
import MKButton from 'components/MKButton';

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
    const [allCompanies, setAllCompanies] = useState([]);
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
                console.error(e)
            }
        }
    getAllCompanies();
    }, [])
    return (
        <BasicPageLayout title="View All Companies">
            <List sx={{ width: '100%' }}>
                {
                    allCompanies.map((c, idx) =>
                        <MKButton
                            key={idx}
                            onClick={() => window.open(`/company-info/${c.id}`)}
                            fullWidth
                            color='white'
                            variant=''
                            sx={{ my: 1 }}
                        >
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar alt={c.fullName} src="/src/assets/images/profile-avatars/company.png" />
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={c.fullName}
                                    secondary={`Released Projects: ${c.totalProjectNum}`}
                                />
                            </ListItem>
                        </MKButton>
                    )
                }
                
            </List>
        </BasicPageLayout>
    );
};

export default CompanyList;