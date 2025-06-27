import Recat from 'react';
import Sidebar from '../components/Sidebar';

const Energy = () => {
    return (
        <div className="App">
            <Sidebar />
            <div className="w-[1118px] bg-zinc-100 rounded-tl-[50px] rounded-bl-[50px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)]">
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-neutral-700">Energy Management</h1>
                    <p className="mt-4 text-neutral-600">Monitor and manage your energy consumption effectively.</p>
                </div>
            </div>
        </div>
    );
}
export default Energy;