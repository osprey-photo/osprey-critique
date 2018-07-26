# Schema

## Photographers

- uid           int, positive, PRIMARY
- firstName     string
- lastName      string
- email         string
- displayName   string

## Groups

- uid           int, positive, PRIMARY
- name          string
- purpose       string


## Critiques

- uid           int, positive, PRIMARY
- imageId       --> Images.uid
- title         string
- submitterdId  --> Photographers.uid
- openingNotes  string     ?? should be reference to comment?

- state         string, active - archive

## Comments

- uid           int, positive, PRIMARY
- text          string
- authorId      --> Photographers.uid
- critiqueId    --> Criques.uid
- adjustment    --> Adjustments.uid

## Adjustments

- uid           int, positive, PRIMARY
- name          string    ?? should be summary title
- details       json === long string

## Images

- uid           int, positive, PRIMARY
- filehash      string
- caption       string

## Groups_Members

- groupdId      --> Groups.uid          PRIMARY
- memberId      --> Photographers.uid   PRIMARY

## Groups_Admins

- groupdId      --> Groups.uid          PRIMARY
- adminIds      --> Photographers.uid   PRIMARY
