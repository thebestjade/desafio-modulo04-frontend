/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect, useContext } from "react";
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
    Backdrop,
    CircularProgress
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ButtonSubmit from '../../components/ButtonSubmit';
import ptBR from "date-fns/locale/pt-BR";

import './styles.css';
import '../../styles/form.css';
import useStyles from "../../styles/useStyles";

registerLocale('pt-BR', ptBR);

function EditCharge() {
  const classes = useStyles();
  const history = useHistory();
  const {
      handleSubmit,
      control,
      register, formState: { isValid }
  } = useForm({ mode: 'onChange' });
  const [loading, setLoading] = useState(false);
  const [reqError, setReqError] = useState("");
  const [reqSuccess, setReqSuccess] = useState("");

  const {
    register,
    formState: { isValid },
  } = useForm({ mode: "onChange" });


  return (
    <div>
      {!!Object.keys(clients).length && (
        <>
          <div className="container-form flex-column modal-form padding-form-edit">
          <form className='form width-lg label-form' onSubmit={handleSubmit(addCharge)} onKeyDown={e => (e.code === 'Enter' || e.code === 'NumpadEnter') && e.preventDefault()}>
                    <div className='flex-column  content-center items-center'>
                        <div className='flex-column'>
                            <label htmlFor='name'>Cliente</label>
                            <select
                                className='input-form width-lg mb-md'
                                id='name'
                                {...register("clienteId", { required: true })}
                            >
                                {clients.map(({ id, name }) => (
                                    <option
                                        value={id}
                                    >
                                        {name}
                                    </option>
                                ))}
                                <option selected="selected">Selecione o cliente</option>
                            </select>
                        </div>
                        <div className='flex-column'>
                            <label htmlFor='description'>Descrição</label>
                            <input
                                className='input-form width-lg input-description'
                                id='description'
                                type="text"
                                {...register('descricao', { required: true })}
                            />
                            <span className='label-description'>A descrição informada será impressa  no boleto</span>
                        </div>
                        <div className='flex-column'>
                            <label htmlFor='status'>Status</label>
                            <select
                                className='input-form width-lg mb-md'
                                id='name'
                                {...register("status", { required: true })}
                            >
                                <option>
                                    Pendente
                                </option>
                                <option>
                                    Pago
                                </option>
                                <option selected>Selecione um status</option>
                            </select>
                        </div>
                        <div className='flex-row form-gap' >
                            <div className='flex-column'>
                                <label htmlFor='value'>Valor</label>
                                <Controller
                                    control={control}
                                    id='valor'
                                    {...register('valor', { required: true })}
                                    render={({ field }) => (
                                        <CurrencyInput
                                            onChange={(value) => field.onChange(value)}
                                            value={field.value}
                                            placeholder='R$ 0,00'
                                            className='input-form width-mid' type="text"
                                        />
                                    )}
                                />

                            </div>
                            <div className='flex-column'>
                                <label htmlFor='dueDate'>Vencimento</label>
                                <Controller
                                    control={control}
                                    id='dueDate'
                                    {...register('vencimento', { required: true })}
                                    render={({ field }) => (
                                        <ReactDatePicker
                                            className='input-form'
                                            onChange={(date) => field.onChange(date)}
                                            selected={field.value}
                                            locale='pt-BR'
                                            dateFormat="dd 'de' MMMM 'de' yyyy"
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        {reqSuccess && (<Alert severity="success" onClose={closeAlert}>
                            {reqSuccess}
                        </Alert>)}

                        {reqError && (<Alert severity="error" onClose={closeAlert}>
                            {reqError}
                        </Alert>)}

                        <Backdrop className={classes.backdrop} open={loading}>
                            <CircularProgress color="inherit" />
                        </Backdrop>

                        <div className='flex-row form-gap ml-auto'>

                            <button
                                className='btn-cancel mt-lg'
                                type="button"
                                onClick={() => history.goBack()}
                            >
                                Cancelar
                            </button>

                            <ButtonSubmit
                                label='Criar cobrança'
                                color={isValid && '#DA0175'}
                            />
                        </div>
                    </div>
                </form>
          </div>
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      )}
    </div>
  );
}

export default EditCharge;
