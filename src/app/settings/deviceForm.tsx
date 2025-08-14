"use client"
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useAddDevice, useDevices} from "@/services/api/device/deviceService";
import {HardDrive, Monitor, Smartphone, Tablet} from "lucide-react";
import React, {useState} from "react";

const getDeviceIcon = (deviceType: string) => {
    switch (deviceType.toLowerCase()) {
        case 'mobile':
            return <Smartphone className="h-4 w-4"/>
        case 'desktop':
            return <Monitor className="h-4 w-4"/>
        case 'tablet':
            return <Tablet className="h-4 w-4"/>
        default:
            return <HardDrive className="h-4 w-4"/>
    }
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
}

export function DeviceForm() {
    const {data: devices, isLoading} = useDevices()
    const addDevice = useAddDevice()
    const [deviceName, setDeviceName] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleAddDevice = () => {
        if (deviceName.trim()) {
            addDevice.mutate(deviceName.trim(), {
                onSuccess: () => {
                    setDeviceName('')
                    setIsDialogOpen(false)
                }
            })
        }
    }

    if (isLoading) {
        return <div>Loading devices...</div>
    }

    return (
        <div className="space-y-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button>Add the current device</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Device</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="deviceName" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="deviceName"
                                value={deviceName}
                                onChange={(e) => setDeviceName(e.target.value)}
                                placeholder="Enter device name"
                                className="col-span-3"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && deviceName.trim()) {
                                        handleAddDevice()
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleAddDevice}
                            disabled={addDevice.isPending || !deviceName.trim()}
                        >
                            {addDevice.isPending ? 'Adding...' : 'Add Device'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="space-y-2">
                <h3 className="text-sm font-medium">Your Devices</h3>
                {devices?.length === 0 ? (
                    <p className="text-sm text-gray-500">No devices found</p>
                ) : (
                    <div className="space-y-2">
                        {devices?.map((device) => (
                            <Card key={device.id} className="p-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {getDeviceIcon(device.type)}
                                        <div>
                                            <p className="text-sm font-medium">{device.name}</p>
                                            <p className="text-xs text-gray-500">{device.type}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {device.lastUsedAt && (
                                            <p className="text-xs text-gray-500">
                                                Last used: {formatDate(device.lastUsedAt)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}