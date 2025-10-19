import { useState } from 'react'
import { Plus } from 'lucide-react'
import { NextOfKinForm } from '../../../forms/dashboard/NextOfKinForm'
import type { NextOfKin } from '@/core/types/kin'
import type { NextOfKinData } from '@/core/validators/kin.schema'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCustomerProfile } from '@/core/hooks/customer/use-profile'
import { useBank } from '@/core/hooks/customer/use-bank'
import { useCreateKin, useDeleteKin,useKin,useUpdateKin } from '@/core/hooks/customer/use-kin'
import { useBeneficiary } from '@/core/hooks/customer/use-beneficiaries'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { BankAccountsTable } from '@/core/features/components/banks/BankAccountsTable'
import { BankSection } from '@/core/features/components/banks/BankSection'


export const ProfilePage = () => {
  const { data: profileDetails, isLoading: profileLoading, error: profileError } = useCustomerProfile()

  const { data: kinDetails, isLoading: kinLoading, error: kinError } = useKin()
  const createKin = useCreateKin()
  const updateKin = useUpdateKin()
  const deleteKin = useDeleteKin()

  const [kinFormOpen, setKinFormOpen] = useState(false)
  const [editingKin, setEditingKin] = useState<NextOfKin | null>(null)
  const [deleteKinId, setDeleteKinId] = useState<number | null>(null)


  const handleCreateOrUpdateKin = async (values: NextOfKinData ) => {
    if ("id" in values && values.id) {
      await updateKin.mutateAsync(values)
    } else {
      await createKin.mutateAsync(values)
    }
    setKinFormOpen(false)
    setEditingKin(null)
  }

  const handleDeleteKin = async () => {
    if (!deleteKinId) return
    await deleteKin.mutateAsync(deleteKinId)
    setDeleteKinId(null) 
  }


  const { data: beneficiaryDetails, isLoading: beneficiaryLoading, error: beneficiaryError } = useBeneficiary()
  const { data: bankDetails, isLoading: bankLoading, error: bankError } = useBank()


  console.log('ProfilePage profile', profileDetails)
  console.log('ProfilePage bankDetails', bankDetails)
  console.log('ProfilePage kinDetails', kinDetails)
  console.log('ProfilePage beneficiaries', beneficiaryDetails)

  const [kycDocuments] = useState([
    { name: 'ID or Passport', description: 'ID or Passport', number: '', actions: '' },
    { name: 'Tax/KRA PIN', description: 'Tax Identification (KRA PIN for Kenyans)', number: '', actions: '' },
    { name: 'Color passport sized photos', description: 'Passport sized photos (in color)', number: '', actions: '' },
  ])

  return (
    <div className="space-y-8">
      {/* PROFILE SUMMARY */}
      <section className="bg-white shadow rounded-md p-6">
        {profileLoading ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-6 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
        ) : profileError ? (
          <p className="text-red-600 text-sm">Failed to load profile details.</p>
        ): !profileDetails ? (
          <div className="text-gray-500 text-sm">
            No profile data available.
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-gray-900">
                  {profileDetails.full_name || '—'}
            </h1>
            <p className="text-gray-600">
                  Member No: {profileDetails.member_no || '—'}
            </p>
          </>
        )}
      </section>


      <BankSection />

      {/* NEXT OF KIN */}
      <section className="bg-white shadow rounded-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Next of Kin</h2>
          <Button 
          variant="outline" 
          size="sm"
            onClick={() => {
              setEditingKin(null)
              setKinFormOpen(true)
            }}
          >
            <Plus className="w-4 h-4 mr-1" /> Add Next of Kin
          </Button>
        </div>

        {kinLoading && (
          <div className="space-y-2 animate-pulse">
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-56 bg-gray-200 rounded" />
          </div>
        )}

        {kinError && (
          <p className="text-red-500 text-sm">
            {(kinError).message || 'Failed to load next of kin.'}
          </p>
        )}

        {!kinLoading && !kinError && kinDetails && kinDetails.next_of_kin.length === 0 && (
          <p className="text-gray-500 text-sm">No next of kin added yet.</p>
        )}

        {!kinLoading && !kinError && kinDetails && kinDetails.next_of_kin.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Relationship</TableHead>
                <TableHead>ID/Passport Number</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kinDetails.next_of_kin.map((kin) => (
                <TableRow key={kin.id}>
                  <TableCell>{kin.full_name }</TableCell>
                  <TableCell>{kin.relationship}</TableCell>
                  <TableCell>{kin.id_passport_number ?? '-'}</TableCell>
                  <TableCell>{kin.mobile ?? '-'}</TableCell>
                  <TableCell>{kin.email ?? '-'}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingKin(kin)
                        setKinFormOpen(true)
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteKinId(kin.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>

      {/* BENEFICIARIES */}
      <section className="bg-white shadow rounded-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Beneficiaries</h2>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Add Beneficiary
          </Button>
        </div>

        {beneficiaryLoading && (
          <div className="space-y-2 animate-pulse">
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-56 bg-gray-200 rounded" />
          </div>
        )}

        {beneficiaryError && (
          <p className="text-red-500 text-sm">
            {(beneficiaryError).message || 'Failed to load beneficiaries.'}
          </p>
        )}

        {!beneficiaryLoading && !beneficiaryError && beneficiaryDetails && beneficiaryDetails.beneficiaries.length === 0 && (
          <p className="text-gray-500 text-sm">No beneficiaries added yet.</p>
        )}

        {!beneficiaryLoading && !beneficiaryError && beneficiaryDetails && beneficiaryDetails.beneficiaries.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Relationship</TableHead>
                <TableHead>ID/Passport Number</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Mobile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {beneficiaryDetails.beneficiaries.map((ben) => (
                <TableRow key={ben.id}>
                  <TableCell>{ben.full_name}</TableCell>
                  <TableCell>{ben.relationship}</TableCell>
                  <TableCell>{ben.id_passport_number ?? '-'}</TableCell>
                  <TableCell>{ben.percentage_share ?? '-'}</TableCell>
                  <TableCell>{ben.mobile ?? '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>

      {/* KYC DOCUMENTS */}
      <section className="bg-white shadow rounded-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">KYC Documents</h2>
          {/* <Upload> */}
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1" /> Upload KYC Document
            </Button>
          {/* </Upload> */}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Number</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kycDocuments.map((doc, idx) => (
              <TableRow key={idx}>
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.description}</TableCell>
                <TableCell>{doc.number}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <NextOfKinForm
          open={kinFormOpen}
          onClose={() => {
            setKinFormOpen(false)
            setEditingKin(null)
          }}
          defaultValues={editingKin ?? undefined}
          isEdit={!!editingKin}
          onSubmit={handleCreateOrUpdateKin}
        />
      </section>

      <AlertDialog open={!!deleteKinId} onOpenChange={(open) => !open && setDeleteKinId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Next of Kin</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this Next of Kin? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row-reverse justify-between sm:justify-between">
            <AlertDialogCancel onClick={() => setDeleteKinId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteKin}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}
