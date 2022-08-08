/**
 * Author: Ziqi Ding
 * Created At: 14 Jul 2022
 * Discription: A page that shows all companies
 */
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText} from '@mui/material';
import { BASE_URL } from 'api/axios';
import { useEffect, useState } from 'react';
import useAuth from 'auth/useAuth';
import MKButton from 'components/MKButton';
// Showing all companies in Ability Plus platform
const CompanyList = () => {
    const { auth } = useAuth();
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
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={c.fullName} src="/src/assets/images/profile-avatars/company.png" />
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={c.fullName}
                                    secondary={`Released ${c.totalProjectNum} Projects`}
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