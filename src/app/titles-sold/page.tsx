'use client'
import { Button, Divider, Form, Input, InputNumber, Radio, Upload, UploadProps } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { TitlesSoldFormValues } from './titlesSoldFormValues.type';
import { useState } from 'react';

export default function TitlesSold() {
  const [file, setFile] = useState<File | null>(null);
  
  const onFinish = async (values: TitlesSoldFormValues) => { 
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('cnpj', values.cnpj);
    formData.append('praca', values.praca);
    formData.append('uploadSpreadsheet', file);
    formData.append('version', values.version.toString());
    formData.append('susep', values.susep);
    formData.append('raffleDate', values.raffleDate);
    formData.append('raffleNumber', values.raffleNumber.toString());

    const response = await fetch('/api/titles-sold', {
      method: 'POST',
      body: formData, 
    })

    //download zipfile
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'remessa.zip');
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    
    };
  

  return (
    <main className="flex min-h-screen flex-col p-10 items-center">
    <h1 className='text-2xl'>
        Remessa de Títulos Vendidos
    </h1>
    <Divider />
    <Form name="control-hooks" onFinish={onFinish}>
        <Form.Item name="name" label="'Nome ou Sigla" rules={[{ required: true }]}>
            <Input  maxLength={15} />
        </Form.Item>
        <Form.Item name="cnpj" label="CNPJ" rules={[{ required: true }]}>
            <MaskedInput
                mask={
                    ' 00.000.000/0000-00'
                }
            />  
        </Form.Item>
        <Form.Item name="uploadSpreadsheet" label="Planilha de Títulos Vendidos" rules={[{ required: true }]}>
            <Upload name="uploadSpreadsheet"
              beforeUpload={(file) => {
                setFile(file);
                return false;
              }}>
              <Button>Selecione o arquivo</Button>
            </Upload>
        </Form.Item>
        <Form.Item name="praca" label="Código da praça" rules={[{ required: true }]}>
            <Input name="environment" maxLength={3} />
        </Form.Item>
        <Form.Item name="version" label="Versão do arquivo" rules={[{ required: true }]}>
            <InputNumber name="version" maxLength={6} />
        </Form.Item>
        <Form.Item name="susep" label="Código do processo SUSESP" rules={[{ required: true }]}>
            <Input name="susep" maxLength={17} />
        </Form.Item>
        <Form.Item name="raffleDate" label="Data do sorteio" rules={[{ required: true }]}>
            <Input type="date" name="raffleDate" />
        </Form.Item>
        <Form.Item name="raffleNumber" label="Número do sorteio" rules={[{ required: true }]}>
            <Input type="number" maxLength={3} name="raffleNumber" />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit">
                Enviar
            </Button>
        </Form.Item>
    </Form>
    </main>
  )
}
