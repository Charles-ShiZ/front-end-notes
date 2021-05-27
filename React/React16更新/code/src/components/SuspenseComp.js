import React, { Suspense } from 'react'
const LazyComp = React.lazy(() => import('./LazyComp'))
export default function SuspenseComp () {
    const [lazy, setLazy] = React.useState(false)
    setTimeout(() => {
        setLazy(true)
    }, 5000);
    return (
        <div>
        {   lazy && 
            (
                <Suspense fallback={<div style={{color:"red",fontSize:"50px"}}>Loading...</div>}>
                    <LazyComp/>
                </Suspense>
            )
        } 
        </div>
    )
}