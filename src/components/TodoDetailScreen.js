import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { Container, Card, CardItem, H1, Button, Body } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import firebase from 'firebase'

const TodoDetailScreen = props => {
    const [detail, setDetail] = useState({id : '', status : '', dateCreated : '', dateCompleted : '', todo : '' })
    const todoData = useSelector(state => state.todo.todoData);
    const dispatch = useDispatch()

    useEffect(() => {
        const { id } = props.navigation.state.params
        todoData.map(item => { if (item.id === id) setDetail(item) })
    }, [])

    const onClickBack = () => {
        props.navigation.goBack()
    }

    const onClickDelete = () => {
        firebase.database().ref(`/${detail.id}`).remove()
        .catch(err => {
            console.log(err)
        })
        firebase.database().ref('/').on('value', snapshot => {
            if (snapshot.val())
                dispatch({
                    type: 'FILL_TODO',
                    payload: Object.values(snapshot.val())
                })
        })
        onClickBack()
    }

    return (
        <Container>
             <Card style={{ marginTop: '50%' }}>
                <CardItem header>
                    <Body>
                        <H1>
                            Todo: { detail.todo }
                        </H1>
                        <Text>
                            ID: { detail.id }
                        </Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Text>
                        Status: { detail.status }
                    </Text>
                </CardItem>
                <CardItem>
                    <Text>
                        Date Created: { detail.dateCreated }
                    </Text>
                </CardItem>
                <CardItem>
                    <Text>
                        Date Completed: { detail.dateCompleted }
                    </Text>
                </CardItem>
                <CardItem>
                    <Button info>
                        <Text onPress={onClickBack} >Go Back</Text>
                    </Button>
                    <Button danger>
                        <Text onPress={onClickDelete} >Delete</Text>
                    </Button>
                </CardItem>
            </Card>
        </Container>
    )
}

export default TodoDetailScreen