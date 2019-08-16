import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik, Field, Form } from 'formik'
import { createItem, updateItem } from '../collectionActions'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Cancel';
import * as Yup from 'yup';
import ChooseCategory from '../../components/categories/chooseCategory'
import ImageUpload from '../../components/imageUpload/imageUpload'
import Container from '@material-ui/core/Container'
import Hero from '../../template/hero'
import IconButton from '@material-ui/core/IconButton'
import ReactPlayer from 'react-player'

function VideoForm(props) {
  // Validação frontend do formulário
  const VideoSchema = Yup.object().shape({
    title: Yup.string()
      .required('O campo título é obrigatório!'),
    content: Yup.string()
      .required('O campo vídeo é obrigatório!'),

  })

  const isNew = props.isNew
  const initialFormValues = { title: '', author: '', content: '', cover: '', categories: [] }

  return (
    <Formik
      initialValues={isNew ? initialFormValues : props.videoData}
      validationSchema={VideoSchema}
      enableReinitialize
      onSubmit={(values, actions) => {
        if (!values._id) {
          props.createItem(values, 'video');
          actions.resetForm(initialFormValues)
        } else {
          return props.updateItem(values, 'video');
        }
      }}

      render={(formikProps) => {
        const { values, touched, errors, handleChange, handleBlur } = formikProps;
        return (
          <Form encType="multipart/form-data" autoComplete="off">
            <Hero title={isNew ? "Adicionar Video" : `Editar ${props.videoData.title}`}>
              <Link to={`/collection`} >
                <IconButton style={{ marginRight: '10px' }}>
                  <CancelIcon />
                </IconButton>
              </Link>
              <Button variant="contained" color="primary" type="submit">
                {(isNew) ? "Adicionar" : "Atualizar"}
              </Button>
            </Hero>
            <Box mt={3}>
              <Container>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={9}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          autoFocus
                          variant="outlined"
                          required
                          fullWidth
                          label="Título"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={(errors.title && touched.title) && errors.title}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          label="Participante(s)"
                          name="author"
                          value={values.author}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={(errors.author && touched.author) && errors.author}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="Url do vídeo"
                          name="content"
                          value={values.content}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={(errors.content && touched.content) && errors.content}
                        />
                      </Grid>
                      {values.content != "" && (
                        <Grid item xs={12}>
                          <ReactPlayer
                            url={values.content}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="h6" component="h2">
                          Capa do Video
                        </Typography>

                        <Field component={ImageUpload} name="cover" />
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="h6" component="h2">
                          Categorias
                        </Typography>

                        <Box my={2}>
                          <Field component={ChooseCategory} name="categories" />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Form>

        )
      }}
    />
  )
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ createItem, updateItem }, dispatch)
export default connect(null, mapDispatchToProps)(VideoForm)
