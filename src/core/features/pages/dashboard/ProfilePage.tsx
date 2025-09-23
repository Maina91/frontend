import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
// import { Upload } from '@/components/ui/upload'
import { Plus } from 'lucide-react'
import { useCustomerProfile } from '@/core/hooks/customer/useCustomerProfile'
import { useCustomerBankDetails } from '@/core/hooks/customer/useCustomerProfile'


export const ProfilePage = () => {
  const { data: profile, isLoading, error } = useCustomerProfile()
  const { data: bankDetails, isLoading: bankLoading, error: bankError } = useCustomerBankDetails()

  console.log('ProfilePage profile', profile)
  console.log('ProfilePage bankDetails', bankDetails)


  const [nextOfKin, setNextOfKin] = useState([
    { name: 'Test Data', relationship: 'Mother', id: '34567', percentage: '50%' },
    { name: 'Test Data', relationship: 'Sister', id: '5467889', percentage: '50%' },
  ])

  const [kycDocuments, setKycDocuments] = useState([
    { name: 'ID or Passport', description: 'ID or Passport', number: '', actions: '' },
    { name: 'Tax/KRA PIN', description: 'Tax Identification (KRA PIN for Kenyans)', number: '', actions: '' },
    { name: 'Color passport sized photos', description: 'Passport sized photos (in color)', number: '', actions: '' },
  ])

  return (
    <div className="space-y-8">
      {/* PROFILE SUMMARY */}
      <section className="bg-white shadow rounded-md p-6">
        {isLoading ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-6 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
        ) : !profile ? (
          <div className="text-gray-500 text-sm">
            No profile data available.
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-gray-900">
              {profile.full_name || '—'}
            </h1>
            <p className="text-gray-600">
              Member No: {profile.member_no || '—'}
            </p>
          </>
        )}
      </section>

      {/* BANK / MOBILE MONEY ACCOUNTS */}
      <section className="bg-white shadow rounded-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Bank Accounts</h2>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Add Bank Account
          </Button>
        </div>

        {bankLoading ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-5 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-64 bg-gray-200 rounded" />
          </div>
        ) : bankError ? (
          <p className="text-red-600 text-sm">Failed to load bank details.</p>
        ) : !bankDetails?.banks?.length && !bankDetails?.mobile_payments_no ? (
          <p className="text-gray-500 text-sm">No bank or mobile money accounts found.</p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>Branch</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bankDetails?.banks?.map((acc) => (
                  <TableRow key={acc.id}>
                    <TableCell>{acc.account_name}</TableCell>
                    <TableCell>{acc.account_no}</TableCell>
                    <TableCell>{acc.name}</TableCell>
                    <TableCell>{acc.branch_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {bankDetails?.mobile_payments_no && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700">Mobile Payment Number</h3>
                <p className="text-gray-900">{bankDetails.mobile_payments_no}</p>
              </div>
            )}
          </>
        )}
      </section>


      {/* NEXT OF KIN */}
      <section className="bg-white shadow rounded-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Next of Kin</h2>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Add Next of Kin
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Relationship</TableHead>
              <TableHead>ID/Passport Number</TableHead>
              <TableHead>Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nextOfKin.map((kin, idx) => (
              <TableRow key={idx}>
                <TableCell>{kin.name}</TableCell>
                <TableCell>{kin.relationship}</TableCell>
                <TableCell>{kin.id}</TableCell>
                <TableCell>{kin.percentage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
      </section>
    </div>
  )
}
