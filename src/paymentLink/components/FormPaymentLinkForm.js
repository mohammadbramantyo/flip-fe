import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  Button,
  Form,
  SelectionField,
  MultiSelectionField,
  InputField,
  MultiSelectField,
  TextAreaField,
  VisualizationAttr,
  
} from 'commons/components'
import { ALLOWED_PERMISSIONS, findAllowedPermission } from 'commons/constants/allowedPermission'
import cleanFormData from 'commons/utils/cleanFormData'

import paymentlink from '../services/paymentlink'

const FormPaymentLinkForm = ({  }) => {
  const { control, handleSubmit } = useForm()


  const navigate = useNavigate()

  const kirim = (data) => {
    const cleanData = cleanFormData(data)
    paymentlink({
      ...cleanData,
	  type:"SINGLE"
      
    })
    .then(({ data: { data } }) => {
      navigate(`/paymentlink/confirmation`, { state: data })
    })
    .catch((error) => {
      toast.error(error.response?.data?.data?.message || error || 'Terjadi kesalahan pada sistem. Harap coba lagi!');
    });
  }

  return (
    <Form 
	  title="Payment Link Form" 
	  onSubmit={handleSubmit(kirim)}
	  >

		  <Controller
	        name="title"
	        control={control}
	        render={({ field, fieldState }) => (
			  <InputField
	            label="Nama Pembayaran ex: bayar donasi"
	            placeholder="Masukkan nama pembayaran"
	            fieldState={fieldState}
				{...field}
				isRequired={true}
	          />
	        )}
	      />

		  <Controller
	        name="amount"
	        control={control}
	        render={({ field, fieldState }) => (
			  <InputField
	            label="Jumlah"
	            placeholder="Masukkan jumlah"
				type="number"
	            fieldState={fieldState}
				{...field}
				isRequired={true}
	          />
	        )}
	      />
		  <Controller
	        name="sender_name"
	        control={control}
	        render={({ field, fieldState }) => (
			  <InputField
	            label="Nama Pengirim"
	            placeholder="Masukkan nama pengirim"
	            fieldState={fieldState}
				{...field}
				isRequired={true}
	          />
	        )}
	      />
		  <Controller
	        name="sender_email"
	        control={control}
	        render={({ field, fieldState }) => (
			  <InputField
	            label="Email"
	            placeholder="Masukkan Email"
	            fieldState={fieldState}
				type="email"
				{...field}
				isRequired={true}
	          />
	        )}
	      />
		  <Controller
	        name="sender_bank"
	        control={control}
	        render={({ field, fieldState }) => (
			  <InputField
	            label="Bank"
	            placeholder="Masukkan Nama Bank"
	            fieldState={fieldState}
				{...field}
				isRequired={true}
	          />
	        )}
	      />
		  <Controller
	        name="sender_bank_type"
	        control={control}
	        render={({ field, fieldState }) => (
			  <InputField
	            label="Tipe Pembayaran"
	            placeholder="Masukkan tipe pembayaran"
	            fieldState={fieldState}
				{...field}
				isRequired={true}
	          />
	        )}
	      />
		<div className="card-actions justify-end">
			<Button type="submit" variant="primary">Kirim</Button>
		</div>
    </Form>
  )
}

export default FormPaymentLinkForm
