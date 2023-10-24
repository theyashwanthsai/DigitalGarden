## Linked List
This article covers single linked list.

A Linked List is basically nodes connected or linked to each other. We will discuss how they are linked together.

A node is basically a block which contains a data and a pointer which points to the data of the next node’s data or points to null if that block is the last node in the list.

```c
struct node
{
    int data;
    struct node *next;
};
// We created a structure named node. It has data and a pointer named next.
```

How to initialise the linkedlist?

In the main function, We first create a node called head which is the first node and it is used as reference node to transverse through the list.

```c
int main()
{
    struct node *head;
        // creating head node
    head = (struct node *)malloc(sizeof(struct node));
        // allocating memory
    head->data = 45;
        // head node's data 
    head->next = NULL;
        // head node's next pointer points to null as we have only one element.

    return 0;
}

```
We now have a list with one element 45.

We can simply add more values for the time being to see how it works.

```c
int main()
{
    struct node *head;
    head = (struct node *)malloc(sizeof(struct node));
    head->data = 5;
    head->next = NULL;

    struct node *current = (struct node *)malloc(sizeof(struct node));
    current->data = 98;
    current->next = NULL;
        // we create a second node current and the next pointer points to null as only two elements are present.
    head->next = current;
        // we assign the head node's next pointer to current. That means it stores the address of 98.   

    current = malloc(sizeof(struct node));
    current->data = 34;
    current->next = NULL;
        // we assign this node's next pointer to null.
    head->next->next = current;
        // head->next->next should point to the address of 34. 

    return 0;
}

```
This code should give me a list

5 98 34

The first node contains integer data 5 and address of 98, Second node contains data 98 and address of 34. The third node contains 34 and next pointer points to null.

In the next article, Further operations on linked list will be covered.