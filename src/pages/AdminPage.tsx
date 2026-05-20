import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, getUsers, useAuth } from '@/lib/auth';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Mail, Calendar, Shield, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Basic protection check
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    setRegisteredUsers(getUsers());
  }, [user, navigate]);

  const filteredUsers = registeredUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1 text-lg">
              Manage and view all registered users in your application.
            </p>
          </div>
          <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex items-center gap-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Users className="text-primary h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">{registeredUsers.length}</p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-none shadow-lg">
            <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-6">
              <div>
                <CardTitle className="text-xl">Registered Users</CardTitle>
                <CardDescription>A comprehensive list of everyone who joined.</CardDescription>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name or email..." 
                  className="pl-9 bg-muted/30 border-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[250px] py-4 px-6">User</TableHead>
                    <TableHead className="py-4 px-6">Email</TableHead>
                    <TableHead className="py-4 px-6">Role</TableHead>
                    <TableHead className="py-4 px-6">Joined Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((u) => (
                      <TableRow key={u.id} className="group transition-colors hover:bg-muted/30">
                        <TableCell className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm uppercase">
                              {u.name.charAt(0)}
                            </div>
                            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {u.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-3.5 w-3.5" />
                            {u.email}
                          </div>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          {u.role === 'admin' ? (
                            <Badge className="bg-primary/10 text-primary border-primary/20 flex w-fit items-center gap-1 px-2.5 py-0.5">
                              <Shield className="h-3 w-3" />
                              Admin
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground border-muted-foreground/20 px-2.5 py-0.5">
                              User
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(u.createdAt).toLocaleDateString(undefined, { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-48 text-center text-muted-foreground">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Users className="h-8 w-8 opacity-20" />
                          <p>No users found matching your search.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}