import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import 'bootstrap/dist/css/bootstrap.min.css';

// Schéma de validation Zod
const preferenceSchema = z.object({
  activitesInteret: z.string().min(1, { message: 'Veuillez entrer vos activités préférées.' }),
  typesRestaurants: z.string().min(1, { message: 'Veuillez entrer les types de restaurants préférés.' }),
  budget: z.number().min(1, { message: 'Veuillez entrer un budget valide.' }).max(100000),
  dureeSejour: z.number().min(1, { message: 'Veuillez entrer la durée de séjour.' }),
  lieuSejour: z.string().min(1, { message: 'Veuillez entrer le lieu de séjour.' }),
  nombreAdultes: z.number().min(1, { message: 'Veuillez entrer un nombre valide d’adultes.' }).max(30),
  nombreEnfants: z.number().min(0, { message: 'Veuillez entrer un nombre valide d’enfants.' }).max(30),
  personnesAgeesMobiliteReduite: z.number().min(0, { message: 'Veuillez entrer un nombre valide de personnes âgées.' }).max(30),
  motorise: z.boolean(),
});

const PreferenceForm = ({ userID }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(preferenceSchema),
  });

  const onSubmit = async (values) => {
    try {
      const response = await fetch(`http://localhost:8000/preferences/${userID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.success) {
        alert('Preferences saved successfully');
      } else {
        alert('Failed to save preferences');
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <Container style={{ marginTop: 140, marginBottom: 50 }}>
      <h2>Set Your Preferences</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <Form.Group controlId="activitesInteret">
              <Form.Label>Preferred Activities:</Form.Label>
              <Form.Control
                type="text"
                {...register('activitesInteret')}
                placeholder="Enter your preferred activities"
                isInvalid={!!errors.activitesInteret}
              />
              <Form.Control.Feedback type="invalid">
                {errors.activitesInteret?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="typesRestaurants">
              <Form.Label>Types of Restaurants:</Form.Label>
              <Form.Control
                type="text"
                {...register('typesRestaurants')}
                placeholder="Enter your preferred types of restaurants"
                isInvalid={!!errors.typesRestaurants}
              />
              <Form.Control.Feedback type="invalid">
                {errors.typesRestaurants?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="budget">
              <Form.Label>Budget:</Form.Label>
              <Form.Control
                type="number"
                {...register('budget', { valueAsNumber: true })}
                placeholder="Enter your budget"
                isInvalid={!!errors.budget}
              />
              <Form.Control.Feedback type="invalid">
                {errors.budget?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="dureeSejour">
              <Form.Label>Duration of Stay:</Form.Label>
              <Form.Control
                type="text"
                {...register('dureeSejour')}
                placeholder="Enter the duration of your stay"
                isInvalid={!!errors.dureeSejour}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dureeSejour?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="lieuSejour">
          <Form.Label>Location of Stay:</Form.Label>
          <Form.Control
            type="text"
            {...register('lieuSejour')}
            placeholder="Enter the location of your stay"
            isInvalid={!!errors.lieuSejour}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lieuSejour?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="nombreAdultes">
              <Form.Label>Number of Adults:</Form.Label>
              <Form.Control
                type="number"
                {...register('nombreAdultes', { valueAsNumber: true })}
                placeholder="Enter the number of adults"
                isInvalid={!!errors.nombreAdultes}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombreAdultes?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="nombreEnfants">
              <Form.Label>Number of Children:</Form.Label>
              <Form.Control
                type="number"
                {...register('nombreEnfants', { valueAsNumber: true })}
                placeholder="Enter the number of children"
                isInvalid={!!errors.nombreEnfants}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombreEnfants?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="personnesAgeesMobiliteReduite">
          <Form.Label>Number of Elderly Persons with Mobility Issues:</Form.Label>
          <Form.Control
            type="number"
            {...register('personnesAgeesMobiliteReduite', { valueAsNumber: true })}
            placeholder="Enter the number of elderly persons with mobility issues"
            isInvalid={!!errors.personnesAgeesMobiliteReduite}
          />
          <Form.Control.Feedback type="invalid">
            {errors.personnesAgeesMobiliteReduite?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="motorise">
          <Form.Check
            type="checkbox"
            label="Motorized"
            {...register('motorise')}
            isInvalid={!!errors.motorise}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Preferences'}
        </Button>
      </Form>
    </Container>
  );
};

export default PreferenceForm;
