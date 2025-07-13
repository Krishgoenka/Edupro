
"use client";

import React, { useState, useEffect, useMemo, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from "@/components/ui/input";
import { Badge } from '@/components/ui/badge';
import { Loader2, ShieldCheck, User as UserIcon, ArrowUpDown } from 'lucide-react';
import { getUsersAction } from '@/app/actions';

const ADMIN_EMAIL = 'goenkakrish02@gmail.com';

type UserData = {
    uid: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    creationTime: string;
    role: 'admin' | 'user';
};

type SortConfig = {
    key: keyof UserData;
    direction: 'ascending' | 'descending';
};

export default function AdminPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

    const isAuthorizedAdmin = useMemo(() => user?.email === ADMIN_EMAIL, [user]);

    useEffect(() => {
        if (!authLoading && !isAuthorizedAdmin) {
            router.push('/dashboard');
        }
    }, [user, isAuthorizedAdmin, authLoading, router]);

    useEffect(() => {
        const fetchUsers = async () => {
            if (user && isAuthorizedAdmin) {
                startTransition(async () => {
                    const idToken = await user.getIdToken(true); // Force refresh the token
                    const result = await getUsersAction(idToken);
                    if (result.error) {
                        setError(result.error);
                    } else if (result.users) {
                        setUsers(result.users);
                    }
                });
            }
        };

        if (isAuthorizedAdmin) {
            fetchUsers();
        }
    }, [user, isAuthorizedAdmin]);
    
    const requestSort = (key: keyof UserData) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedUsers = useMemo(() => {
        let sortableUsers = [...users];
        if (sortConfig !== null) {
            sortableUsers.sort((a, b) => {
                const aValue = a[sortConfig.key] || '';
                const bValue = b[sortConfig.key] || '';
                
                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableUsers.filter(u => 
            u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
            u.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, sortConfig, searchTerm]);

    const getSortIndicator = (key: keyof UserData) => {
        if (!sortConfig || sortConfig.key !== key) {
            return <ArrowUpDown className="h-4 w-4 ml-2 opacity-30" />;
        }
        return sortConfig.direction === 'ascending' ? '▲' : '▼';
    };


    if (authLoading || isPending) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-200px)]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }
    
    if (!isAuthorizedAdmin) {
         return (
            <div className="container py-12 text-center">
                <p>You do not have permission to view this page.</p>
            </div>
        );
    }

    return (
        <div className="container py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline flex items-center gap-4">
                  <ShieldCheck className="h-10 w-10 text-primary" />
                  Admin Panel
                </h1>
                <p className="text-muted-foreground md:text-xl mt-2">User Management Dashboard</p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>User List</CardTitle>
                    <CardDescription>
                        A list of all users registered in the system.
                    </CardDescription>
                    <div className="pt-4">
                        <Input 
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-destructive">{error}</p>}
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>
                                        <Button variant="ghost" onClick={() => requestSort('email')}>
                                            Email {getSortIndicator('email')}
                                        </Button>
                                    </TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>
                                         <Button variant="ghost" onClick={() => requestSort('creationTime')}>
                                            Created On {getSortIndicator('creationTime')}
                                        </Button>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedUsers.map(u => (
                                    <TableRow key={u.uid}>
                                        <TableCell className="font-medium">{u.displayName || 'N/A'}</TableCell>
                                        <TableCell>{u.email}</TableCell>
                                        <TableCell>
                                            <Badge variant={u.role === 'admin' ? 'default' : 'secondary'}>
                                                {u.role === 'admin' ? <ShieldCheck className="mr-1 h-3.5 w-3.5"/> : <UserIcon className="mr-1 h-3.5 w-3.5"/>}
                                                {u.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{new Date(u.creationTime).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                                {sortedUsers.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
