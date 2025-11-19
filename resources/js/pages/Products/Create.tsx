import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm} from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Alert, AlertTitle, Terminal, AlertDescription } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a New Product',
        href: '/products/create',
    },
];

export default function Index() {

    const {data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      
            // e.preventDefault();
            // console.log(data);

            e.preventDefault();
            post(route('products.store'));
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Product" />
            <div className='w-8/12 p-4'>
               <form onSubmit={handleSubmit} className='space-y-4' >
                    {/* dipsplay error */}

                    {Object.keys(errors).length > 0 && (
                       <Alert>
                        <CircleAlert className='h-4 w-4' />
                        <AlertTitle>Errors!</AlertTitle>
                        <AlertDescription>
                           <ul>
                                {Object.entries(errors).map(([key, message]) => (
                                    <li key={key}>{message as string}</li>
                                ))}
                           </ul>
                        </AlertDescription>
                       </Alert>
                    )}

                    <div className='gap-1.5'>
                        <Label htmlFor="product name">Name</Label>
                        <Input placeholder="Products Name" value={data.name} 
                        onChange={(e) => setData('name', e.target.value)}>
                        </Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="product price">Price</Label>
                        <Input placeholder="Price" value={data.price} 
                        onChange={(e) => setData('price', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="product description">Description</Label>
                        <Textarea placeholder="Description" value={data.description} 
                        onChange={(e) => setData('description', e.target.value)}/>
                    </div>

                    <Button type="submit">Add Product</Button>
               </form>
            </div>
        </AppLayout>
    );


}


